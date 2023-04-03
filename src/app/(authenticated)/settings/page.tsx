import { Segment } from "@/components/surfaces/Segment";
import { Metadata } from "next";
import { SettingsClientPage } from "./client";

export const metadata: Metadata = {
  title: "Configurações",
  description: "...",
};

export default function SettingsPage() {
  return (
    <main style={{ padding: "1em" }}>
      <SettingsClientPage />
    </main>
  );
}
