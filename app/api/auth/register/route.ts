import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/auth";
import { GDPR_POLICY_VERSION } from "@/lib/constants";

// POST /api/auth/register — customer registration.
// B-08: GDPR consent is mandatory and recorded with a policy version + timestamp.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Невалидно тяло на заявката" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Невалидни данни", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, phone, password } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json(
      { error: "Потребител с този имейл вече съществува" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // User + consent are created atomically — no user without a recorded consent.
  const user = await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name,
        email: normalizedEmail,
        phone,
        passwordHash,
        role: "CUSTOMER"
      }
    });

    await tx.consent.create({
      data: {
        userId: created.id,
        type: "GDPR_REGISTRATION",
        policyVersion: GDPR_POLICY_VERSION
      }
    });

    return created;
  });

  return NextResponse.json(
    { id: user.id, email: user.email, name: user.name },
    { status: 201 }
  );
}
