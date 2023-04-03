import { Segment } from "@/components/surfaces/Segment";
import { CreateProcessChat } from "./Chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar processo",
  description: "Crie um processo de certificação de emissão de carbono",
};

export default function CreateProcessPage() {
  return (
    <main style={{ padding: "1em" }}>
      <Segment>
        <CreateProcessChat />
      </Segment>
    </main>
  );
}
