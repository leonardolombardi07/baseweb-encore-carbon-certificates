"use client";

import { Segment } from "@/components/surfaces/Segment";
import { useStyletron } from "@/styles";
import { Button } from "baseui/button";
import { Card, StyledAction, StyledBody, StyledThumbnail } from "baseui/card";
import { HeadingMedium } from "baseui/typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Process, processes } from "@/data";

function Heading() {
  return <HeadingMedium>Processos</HeadingMedium>;
}

function CreateProcessButton() {
  return (
    <Button
      $as={Link}
      href={"./processes/create"}
      kind="secondary"
      style={{ marginTop: "1em" }}
    >
      Criar Processo
    </Button>
  );
}

function ProcessCard({ id, name, description }: Process) {
  const router = useRouter();

  return (
    <Card
      overrides={{ Root: { style: { width: "330px", margin: "1em" } } }}
      title={name}
    >
      <StyledBody>{description}</StyledBody>
      <StyledAction>
        <Button
          onClick={() => router.push(`/processes/${id}`)}
          overrides={{ BaseButton: { style: { width: "100%" } } }}
        >
          Visualizar
        </Button>
      </StyledAction>
    </Card>
  );
}

function Page() {
  const [css] = useStyletron();
  return (
    <Segment>
      <Heading />
      <CreateProcessButton />

      <Segment
        className={css({
          display: "flex",
          marginTop: "1em",
          flexWrap: "wrap",
        })}
      >
        {processes.map((process) => (
          <ProcessCard key={process.id} {...process} />
        ))}
      </Segment>
    </Segment>
  );
}

export { Page };
