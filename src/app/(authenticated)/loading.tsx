"use client";

import { Segment } from "@/components/surfaces/Segment";
import { useStyletron } from "@/styles";
import { Skeleton } from "baseui/skeleton";

export default function Loading() {
  const [_, theme] = useStyletron();

  return (
    <main style={{ padding: "1em" }}>
      <Segment>
        <Skeleton
          rows={1}
          overrides={{
            Row: {
              style: {
                height: theme.typography.HeadingMedium.lineHeight,
                marginBottom: "15px",
                width: "150px",
              },
            },
          }}
        />
        <Skeleton rows={3} />
      </Segment>
    </main>
  );
}
