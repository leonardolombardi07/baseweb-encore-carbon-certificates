// "use client";

import React from "react";

interface OutsideClickListenerProps {
  children: React.ReactNode;
  onClickOutside: (event: MouseEvent) => void;
}

function useOutsideClickListener(
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: OutsideClickListenerProps["onClickOutside"]
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as any)) {
        onClickOutside(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

function OutsideClickListener({
  children,
  onClickOutside,
}: OutsideClickListenerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClickListener(ref, onClickOutside);
  return <div ref={ref}>{children}</div>;
}

export { OutsideClickListener };
