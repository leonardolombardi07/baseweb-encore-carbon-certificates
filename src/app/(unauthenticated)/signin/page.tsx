import { Metadata } from "next";
import { ClientSignInPage } from "./client";

export const metadata: Metadata = {
  title: "Login",
  description: "...",
};

export default function SignInPage() {
  return <ClientSignInPage />;
}
