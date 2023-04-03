import { Metadata } from "next";
import { Page } from "./client";

export const metadata: Metadata = {
  title: "Planos",
  description: "Atualize seus planos",
};

export default function ProcessesPage() {
  return (
    <main style={{ padding: "1em" }}>
      <Page />
    </main>
  );
}
