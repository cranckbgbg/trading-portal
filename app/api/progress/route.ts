import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const progressSchema = z.object({
  articleId: z.string().min(1)
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await prisma.articleProgress.findMany({
    where: { userId: session.user.id },
    select: { articleId: true },
    orderBy: { readAt: "desc" }
  });

  return NextResponse.json(progress.map((entry) => entry.articleId));
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = progressSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  await prisma.articleProgress.upsert({
    where: {
      userId_articleId: {
        userId: session.user.id,
        articleId: payload.data.articleId
      }
    },
    update: {
      readAt: new Date()
    },
    create: {
      userId: session.user.id,
      articleId: payload.data.articleId
    }
  });

  return NextResponse.json({ success: true });
}
