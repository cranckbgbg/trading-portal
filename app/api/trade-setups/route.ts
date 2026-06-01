import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getTradeSetups } from "@/lib/content";
import { prisma } from "@/lib/prisma";

const tradeSetupSchema = z.object({
  symbol: z.string().min(2),
  direction: z.enum(["LONG", "SHORT"]),
  entryPrice: z.number(),
  takeProfit: z.number(),
  stopLoss: z.number()
});

export async function GET() {
  const tradeSetups = await getTradeSetups();
  return NextResponse.json(tradeSetups);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = tradeSetupSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const tradeSetup = await prisma.tradeSetup.create({
    data: payload.data
  });

  return NextResponse.json({ success: true, id: tradeSetup.id });
}
