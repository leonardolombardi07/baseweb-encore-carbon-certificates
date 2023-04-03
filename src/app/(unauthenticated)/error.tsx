"use client";

import { Error as AppError } from "@/components/validation/Error";
import { useStyletron } from "@/styles";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [css] = useStyletron();
  return (
    <div className={css({ width: "90%" })}>
      <AppError error={error} reset={reset} />
    </div>
  );
}
