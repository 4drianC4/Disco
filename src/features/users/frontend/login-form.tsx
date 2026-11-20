"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const result = await signIn("credentials", { email, password, redirect: false });
    setPending(false);
    if (result?.error) {
      setMessage("Credenciales incorrectas");
    } else {
      router.push("/dashboard/events");
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid max-w-md gap-3">
      <h1 className="text-2xl font-semibold">Acceso</h1>
      <Label htmlFor="login-email">Correo</Label>
      <Input id="login-email" name="email" type="email" autoComplete="email" required />
      <Label htmlFor="login-password">Contraseña</Label>
      <Input id="login-password" name="password" type="password" autoComplete="current-password" required />
      <Button disabled={pending} type="submit">{pending ? "Entrando…" : "Entrar"}</Button>
      <p role="alert">{message}</p>
    </form>
  );
}
