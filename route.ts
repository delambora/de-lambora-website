import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  if (!amount || amount <= 0) {
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
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `order_${Date.now()}`
    })
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error?.description || "Razorpay error" }, { status: 500 });
  }

  return NextResponse.json(data);
}
