"use client";

import { Segment } from "@/components/surfaces/Segment";
import { useStyletron } from "@/styles";
import { Accordion, Panel } from "baseui/accordion";
import { ARTWORK_TYPE, Banner } from "baseui/banner";
import { Button } from "baseui/button";
import { Alert } from "@/components/icons";
import { LabelMedium } from "baseui/typography";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  const [css, theme] = useStyletron();
  return (
    <Segment>
      <Banner
        title="Algum erro ocorreu."
        artwork={{
          icon: () => <Alert size={50} aria-label="icon label" />,
          type: ARTWORK_TYPE.badge,
        }}
        kind="negative"
        hierarchy="high"
        nested
      >
        A mensagem recebida é <b>{`"${error.message}"`}</b>.{"\n"}
        {/*  */}
        <Accordion
          overrides={{
            Header: { style: { marginTop: "1em" } },
          }}
        >
          <Panel title={"Visualizar mais informações"}>
            <LabelMedium>Stack:</LabelMedium>
            {error.stack}
          </Panel>
        </Accordion>
        <Button
          onClick={reset}
          kind="tertiary"
          className={css({
            marginTop: "1.5em !important",
            border: `1px solid ${theme.colors.white}`,
            color: theme.colors.white,

            ":hover": {
              background: theme.colors.white,
              color: theme.colors.black,
            },
          })}
        >
          Tentar Novamente
        </Button>
      </Banner>
    </Segment>
  );
}

export { Error };
