import { NextRequest, NextResponse } from "next/server";
import { getItems, addItem } from "@/lib/sheets";

export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json({ items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar itens" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const personName = String(body.personName ?? "").trim();
    const item = String(body.item ?? "").trim();

    if (!personName || personName.length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
    }
    if (!item || item.length < 1) {
      return NextResponse.json({ error: "Item inválido" }, { status: 400 });
    }

    await addItem(personName, item);

    const items = await getItems();
    return NextResponse.json({ success: true, items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao salvar item" }, { status: 500 });
  }
}
