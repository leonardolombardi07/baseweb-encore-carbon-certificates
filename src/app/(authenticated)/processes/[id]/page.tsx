import { Segment } from "@/components/surfaces/Segment";
import { Metadata } from "next";
import { MainInfo, Table } from "./client";
import { processes } from "@/data";

export const metadata: Metadata = {
  title: "Processo",
  description: "...",
};

interface ProcessIdPageProps {
  params: { id: string };
}

export default function ProcessIdPage({ params }: ProcessIdPageProps) {
  const id = params.id;
  const process = processes.find((p) => p.id === id);
  if (!process) {
    // Return error page here?
    return null;
  }
  return (
    <main style={{ padding: "1em" }}>
      <Segment>
        <MainInfo {...process} />
        <Table />
      </Segment>
    </main>
  );
}
