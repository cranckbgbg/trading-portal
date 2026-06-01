import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const newsSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.enum(["FOREX", "GOLD", "CRYPTO", "MACRO"]),
  source: z.string().optional(),
  sourceUrl: z.string().url().optional()
});

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  if (!process.env.N8N_WEBHOOK_API_KEY || apiKey !== process.env.N8N_WEBHOOK_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = newsSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const slug = `${slugify(payload.data.title)}-${Date.now().toString(36)}`;
  const news = await prisma.news.create({
    data: {
      ...payload.data,
      slug
    }
  });

  return NextResponse.json({ success: true, id: news.id });
}
