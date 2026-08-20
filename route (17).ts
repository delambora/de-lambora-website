import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { trackOrder } from "@/lib/shipmozo";

export async function GET(req: Request) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const awb = searchParams.get("awb");

  if (!awb) {
    return NextResponse.json({ error: "Missing awb" }, { status: 400 });
  }

  try {
    const data = await trackOrder(awb);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
