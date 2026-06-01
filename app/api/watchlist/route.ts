import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const watchlistSchema = z.object({
  symbol: z.string().min(1)
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
    select: { symbol: true }
  });

  return NextResponse.json(items.map((item) => item.symbol));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = watchlistSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const symbol = normalizeSymbol(payload.data.symbol);

  await prisma.watchlistItem.upsert({
    where: {
      userId_symbol: {
        userId: session.user.id,
        symbol
      }
    },
    update: {},
    create: {
      userId: session.user.id,
      symbol
    }
  });

  return NextResponse.json({ success: true, symbol });
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = watchlistSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  await prisma.watchlistItem.deleteMany({
    where: {
      userId: session.user.id,
      symbol: normalizeSymbol(payload.data.symbol)
    }
  });

  return NextResponse.json({ success: true });
}

function normalizeSymbol(symbol: string) {
  return symbol.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}
