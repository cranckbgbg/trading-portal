import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignOutButton } from "@/components/sign-out-button";
import { getCurrentUser } from "@/lib/rbac";

export const metadata = { title: "Моят профил | xrent.bg" };

// Protected customer page (B-09). Middleware already gates /account, but we also
// resolve the session server-side so the page never renders without a user.
export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?callbackUrl=/account");
  }

  return (
    <div className="container max-w-2xl py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Моят профил</h1>
        <SignOutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Данни за акаунта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Име: </span>
            {user.name}
          </p>
          <p>
            <span className="text-muted-foreground">Имейл: </span>
            {user.email}
          </p>
          <p>
            <span className="text-muted-foreground">Роля: </span>
            {user.role}
          </p>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        Резервации, документи и плащания се добавят в следващите фази.
      </p>
    </div>
  );
}
