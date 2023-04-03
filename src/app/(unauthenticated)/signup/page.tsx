import { Metadata } from "next";
import { ClientSignUpPage } from "./client";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "...",
};

export default function SignUpPage() {
  return <ClientSignUpPage />;
}
