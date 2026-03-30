import { NextRequest, NextResponse } from "next/server";
import { getRsvps, addRsvp } from "@/lib/sheets";

export async function GET() {
  try {
    const rsvps = await getRsvps();
    const going = rsvps.filter((r) => r.attending).length;
    const notGoing = rsvps.filter((r) => !r.attending).length;
    return NextResponse.json({ rsvps, going, notGoing });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar confirmações" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const attending = Boolean(body.attending);

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }

    await addRsvp(name, attending);

    const rsvps = await getRsvps();
    const going = rsvps.filter((r) => r.attending).length;
    const notGoing = rsvps.filter((r) => !r.attending).length;

    return NextResponse.json({ success: true, rsvps, going, notGoing });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao salvar confirmação" }, { status: 500 });
  }
}
