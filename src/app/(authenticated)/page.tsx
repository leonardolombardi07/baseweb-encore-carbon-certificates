import { Segment } from "@/components/surfaces/Segment";
import { Cards, DataTable, Heading } from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encore - Certificados de Carbono",
  description: "...",
};

export default function Home() {
  return (
    <main style={{ padding: "1em" }}>
      <Segment>
        <Heading />
        <Cards />

        <Segment style={{ margin: "1em 0" }}>
          <DataTable />
        </Segment>
      </Segment>
    </main>
  );
}
