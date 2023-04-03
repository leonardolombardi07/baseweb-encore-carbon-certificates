import { Metadata } from "next";
import { ProfileClientPage } from "./client";

export const metadata: Metadata = {
  title: "Perfil",
  description: "...",
};

export default function ProfilePage() {
  return (
    <main style={{ padding: "1em" }}>
      <ProfileClientPage />
    </main>
  );
}
