import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const closeJournalEntrySchema = z.object({
  exitPrice: z.number(),
  outcome: z.enum(["WIN", "LOSS", "BREAKEVEN"]),
  pnl: z.number().optional(),
  notes: z.string().optional()
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = closeJournalEntrySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.journalEntry.updateMany({
    where: {
      id: params.id,
      userId: session.user.id
    },
    data: payload.data
  });

  if (!entry.count) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entry = await prisma.journalEntry.deleteMany({
    where: {
      id: params.id,
      userId: session.user.id
    }
  });

  if (!entry.count) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
