import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Role } from "@prisma/client";

// Server-side RBAC helpers (B-09). API route handlers and server components call
// these to enforce authentication, role, and resource ownership. They throw a
// typed HttpError that handlers translate into 401/403 responses.

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

export interface SessionUser {
  id: string;
  role: Role;
  email?: string | null;
  name?: string | null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return null;
  }
  return {
    id: session.user.id,
    role: session.user.role,
    email: session.user.email,
    name: session.user.name
  };
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new HttpError(401, "Необходима е автентикация");
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "ADMIN") {
    throw new HttpError(403, "Необходими са администраторски права");
  }
  return user;
}

// Ensures the current user owns the resource (or is an admin). Pass the owner id
// of the resource being accessed (B-09: a customer sees only their own data).
export function requireOwnership(user: SessionUser, ownerId: string): void {
  if (user.role !== "ADMIN" && user.id !== ownerId) {
    throw new HttpError(403, "Нямате достъп до този ресурс");
  }
}
