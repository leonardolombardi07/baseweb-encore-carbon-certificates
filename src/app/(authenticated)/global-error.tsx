"use client";

import "../globals.css";
import { Error as AppError } from "@/components/validation/Error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main style={{ padding: "1em" }}>
          <AppError error={error} reset={reset} />
        </main>
      </body>
    </html>
  );
}
