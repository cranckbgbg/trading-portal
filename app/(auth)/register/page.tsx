import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export const metadata = { title: "Регистрация | xrent.bg" };

export default function RegisterPage() {
  return (
    <div className="container flex justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Създай профил</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          <p className="text-sm text-muted-foreground">
            Вече имаш профил?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Вход
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
