import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createJournalEntrySchema = z.object({
  symbol: z.string().min(1),
  direction: z.enum(["LONG", "SHORT"]),
  entryPrice: z.number(),
  lotSize: z.number().optional(),
  notes: z.string().optional(),
  tradeDate: z.string().datetime().or(z.string().date())
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await prisma.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { tradeDate: "desc" }
  });

  return NextResponse.json(entries.map(serializeJournalEntry));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = createJournalEntrySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: session.user.id,
      symbol: payload.data.symbol.toUpperCase(),
      direction: payload.data.direction,
      entryPrice: payload.data.entryPrice,
      lotSize: payload.data.lotSize ?? 0.01,
      notes: payload.data.notes,
      tradeDate: new Date(payload.data.tradeDate)
    }
  });

  return NextResponse.json(serializeJournalEntry(entry));
}

function serializeJournalEntry(entry: {
  id: string;
  userId: string;
  symbol: string;
  direction: "LONG" | "SHORT";
  entryPrice: unknown;
  exitPrice: unknown | null;
  lotSize: unknown;
  outcome: string | null;
  pnl: unknown | null;
  notes: string | null;
  tradeDate: Date;
  createdAt: Date;
}) {
  return {
    ...entry,
    entryPrice: Number(entry.entryPrice),
    exitPrice: entry.exitPrice === null ? null : Number(entry.exitPrice),
    lotSize: Number(entry.lotSize),
    pnl: entry.pnl === null ? null : Number(entry.pnl)
  };
}
