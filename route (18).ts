import { NextResponse } from "next/server";
import { priceCart } from "@/lib/pricing";

export async function POST(req: Request) {
  const { items } = await req.json();

  let priced;
  try {
    priced = await priceCart(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Could not price cart" }, { status: 400 });
  }

  if (priced.total <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`
    },
    body: JSON.stringify({
      amount: Math.round(priced.total * 100), // paise — computed server-side from DB prices
      currency: "INR",
      receipt: `order_${Date.now()}`
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error?.description || "Razorpay error" }, { status: 500 });
  }

  // Return the verified breakdown alongside the Razorpay order so the client
  // can reconcile its (untrusted) local total with what will actually be charged.
  return NextResponse.json({
    ...data,
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total
  });
}
