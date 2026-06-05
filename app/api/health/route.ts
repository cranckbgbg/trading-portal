import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/health — liveness + DB connectivity probe (Phase 0 DoD).
export async function GET() {
  let database = "unknown";
  try {
    if (process.env.DATABASE_URL) {
      await prisma.$queryRaw`SELECT 1`;
      database = "up";
    } else {
      database = "not_configured";
    }
  } catch {
    database = "down";
  }

  const healthy = database === "up" || database === "not_configured";
  return NextResponse.json(
    { status: healthy ? "ok" : "error", database, time: new Date().toISOString() },
    { status: healthy ? 200 : 503 }
  );
}
