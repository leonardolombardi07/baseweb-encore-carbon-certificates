"use client";

import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Segment } from "@/components/surfaces/Segment";
import { Grid, Cell } from "baseui/layout-grid";

const body = `Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
ornare faucibus ex, non facilisis nisl. Proin ut dui sed metus
pharetra hend rerit vel non mi. Nulla
ornare faucibus ex, non facilisis nisl.`;

function Page() {
  return (
    <Segment>
      <Grid gridGaps={20}>
        <Cell span={[4, 8, 4]}>
          <PlanCard title="Gratuito" body={body} />
        </Cell>

        <Cell span={[4, 8, 4]}>
          <PlanCard title="Premium" body={body} />
        </Cell>

        <Cell span={[4, 8, 4]}>
          <PlanCard title="Empresarial" body={body} />
        </Cell>
      </Grid>
    </Segment>
  );
}

interface PlanCardProps {
  title: string;
  body?: string;
}

function PlanCard({ title, body }: PlanCardProps) {
  return (
    <Card
      overrides={{
        Title: {
          style: { textAlign: "center" },
        },
      }}
      title={title}
    >
      <StyledBody>{body}</StyledBody>
      <StyledAction>
        <Button
          overrides={{
            BaseButton: { style: { width: "100%", marginTop: "1em" } },
          }}
        >
          Atualizar
        </Button>
      </StyledAction>
    </Card>
  );
}

export { Page };
