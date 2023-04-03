"use client";

import { styled } from "@/styles";
import { RootLayout } from "../root";

export default function RootUnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <PageContainer>{children}</PageContainer>
    </RootLayout>
  );
}

const PageContainer = styled("div", ({ $theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  background: $theme.colors.backgroundTertiary,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
