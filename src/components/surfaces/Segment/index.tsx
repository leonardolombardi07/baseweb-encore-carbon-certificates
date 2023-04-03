"use client";

import { useStyletron } from "@/styles";
import React from "react";

interface SegmentProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

function Segment({ as, children, className, ...rest }: SegmentProps) {
  const [css, theme] = useStyletron();

  const Component = as || "div";

  const defaultClassName = css({
    padding: "1em",
    background: theme.colors.backgroundPrimary,
    border: `1px solid ${theme.colors.borderOpaque}`,
    borderRadius: "0.5em",
  });

  return (
    <Component className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </Component>
  );
}

export { Segment };
