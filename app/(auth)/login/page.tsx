import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata = { title: "Вход | xrent.bg" };

export default function LoginPage({
  searchParams
}: {
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = searchParams.callbackUrl || "/account";

  return (
    <div className="container flex justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm callbackUrl={callbackUrl} />
          <p className="text-sm text-muted-foreground">
            Нямаш профил?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Регистрирай се
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
