"use client";

import { useStyletron } from "@/styles";
import "../globals.css";
import { Error as AppError } from "@/components/validation/Error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [css] = useStyletron();
  return (
    <html>
      <body>
        <div className={css({ width: "90%" })}>
          <AppError error={error} reset={reset} />
        </div>
      </body>
    </html>
  );
}
