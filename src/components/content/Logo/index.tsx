import Image, { ImageProps } from "next/image";
import LogoWhitePng from "../../../../public/images/LogoWhite.png";
import LogoBlackPng from "../../../../public/images/LogoBlack.png";
import { useThemeState } from "@/state/theme";

type LogoProps = Omit<ImageProps, "src" | "alt"> & {
  className?: string;
};

function Logo(props: LogoProps) {
  const {
    state: { theme },
  } = useThemeState();
  return (
    <Image
      {...props}
      alt="Logo"
      src={theme === "light" ? LogoBlackPng : LogoWhitePng}
    />
  );
}

export { Logo };
