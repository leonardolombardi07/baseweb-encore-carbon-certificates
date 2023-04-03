"use client";

import { Error as AppError } from "@/components/validation/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main style={{ padding: "1em" }}>
      <AppError error={error} reset={reset} />
    </main>
  );
}
