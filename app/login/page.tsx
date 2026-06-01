import { PageHero } from "@/components/page-hero";
import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  const authConfigured = Boolean(process.env.DATABASE_URL && process.env.NEXTAUTH_SECRET);

  return (
    <>
      <PageHero
        eyebrow="Sign In"
        title="Access your trade setups."
        description="Enter your email and we will send you a magic link to sign in."
      />
      <section className="container flex justify-center pb-16">
        <LoginForm authConfigured={authConfigured} />
      </section>
    </>
  );
}
