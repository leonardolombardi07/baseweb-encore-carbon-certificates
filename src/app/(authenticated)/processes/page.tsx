import { Page } from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processos",
  description: "Gerencie seus processos",
};

export default function ProcessesPage() {
  return (
    <main style={{ padding: "1em" }}>
      <Page />
    </main>
  );
}
