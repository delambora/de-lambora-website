// Server-only helper for calling ShipMozo's API. Never import this into a
// client component — it uses your private key, which must stay on the
// server. Every function here should only ever be called from a server
// action, a route handler, or another server-only file.

const BASE_URL = "https://shipping-api.com/app/api/v1";

function shipmozoHeaders() {
  return {
    "Content-Type": "application/json",
    "public-key": process.env.SHIPMOZO_PUBLIC_KEY!,
    "private-key": process.env.SHIPMOZO_PRIVATE_KEY!
  };
}

async function shipmozoRequest(path: string, method: "GET" | "POST", body?: any) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: shipmozoHeaders(),
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });

  const data = await res.json();

  if (data.result !== "1") {
    throw new Error(data.message || "ShipMozo request failed");
  }

  return data.data;
}

export async function createWarehouse(warehouse: {
  address_title: string;
  name?: string;
  phone?: number;
  email?: string;
  address_line_one: string;
  address_line_two?: string;
  pin_code: number;
}) {
  return shipmozoRequest("/create-warehouse", "POST", warehouse);
}

export async function getWarehouses() {
  return shipmozoRequest("/get-warehouses", "GET");
}

export async function pushOrder(order: {
  order_id: string;
  order_date: string;
  consignee_name: string;
  consignee_phone: number;
  consignee_email?: string;
  consignee_address_line_one: string;
  consignee_address_line_two?: string;
  consignee_pin_code: number;
  consignee_city: string;
  consignee_state: string;
  product_detail: Array<{
    name: string;
    sku_number: string;
    quantity: number;
    unit_price: number;
    hsn?: string;
    product_category: string;
  }>;
  payment_type: "PREPAID" | "COD";
  cod_amount?: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  warehouse_id: string;
}) {
  return shipmozoRequest("/push-order", "POST", {
    ...order,
    order_type: "ESSENTIALS"
  });
}

export async function autoAssignOrder(order_id: string) {
  return shipmozoRequest("/auto-assign-order", "POST", { order_id });
}

export async function trackOrder(awb_number: string) {
  return shipmozoRequest(`/track-order?awb_number=${encodeURIComponent(awb_number)}`, "GET");
}
