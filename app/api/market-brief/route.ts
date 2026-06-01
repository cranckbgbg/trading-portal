import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getLatestBrief } from "@/lib/content";
import { prisma } from "@/lib/prisma";

const briefSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(20),
  markets: z.array(z.string().min(1)).min(1)
});

export async function GET() {
  const brief = await getLatestBrief();
  return NextResponse.json(brief);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = briefSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const brief = await prisma.marketBrief.create({
    data: payload.data
  });

  return NextResponse.json({ success: true, id: brief.id });
}
