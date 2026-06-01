import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getRecaps } from "@/lib/content";
import { prisma } from "@/lib/prisma";

const weeklyRecapSchema = z.object({
  weekLabel: z.string().min(3),
  summary: z.string().min(20),
  wins: z.number().int().min(0),
  losses: z.number().int().min(0),
  keyLesson: z.string().min(10)
});

export async function GET() {
  const recaps = await getRecaps();
  return NextResponse.json(recaps);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = weeklyRecapSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const recap = await prisma.weeklyRecap.create({
    data: payload.data
  });

  return NextResponse.json({ success: true, id: recap.id });
}
