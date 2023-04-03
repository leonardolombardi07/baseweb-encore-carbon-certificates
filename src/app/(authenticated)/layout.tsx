"use client";

import { styled, useStyletron } from "@/styles";
import React from "react";
import {
  ALIGN,
  StyledNavigationList as NavigationList,
  StyledNavigationItem as NavigationItem,
  HeaderNavigation,
} from "baseui/header-navigation";
import {
  MenuUnfold,
  MenuFold,
  Dashboard,
  Leaf,
  Certifications,
} from "@/components/icons";
import { Button } from "baseui/button";
import { Avatar } from "baseui/avatar";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { StatefulMenu } from "baseui/menu";
import { OutsideClickListener } from "@/components/utility/OutsideClickListener";
import { RootLayout } from "../root";
import { capitalizeFirstLetter } from "@/utils/text";
import { useThemeState } from "@/state/theme";
import { Logo } from "@/components/content/Logo";

export default function RootAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

  return (
    <RootLayout>
      <ResponsiveContentContainer $isSidebarVisible={isSidebarVisible}>
        <Sidebar
          visible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />

        <React.Fragment>
          <Header
            isSidebarVisible={isSidebarVisible}
            onToggleSidebar={() => setIsSidebarVisible((v) => !v)}
          />
          <AppBreadcrumbs />

          {children}
        </React.Fragment>
      </ResponsiveContentContainer>
    </RootLayout>
  );
}

const SIDEBAR_WIDTH = "255px";

const ResponsiveContentContainer = styled<
  "div",
  { $isSidebarVisible: boolean }
>("div", ({ $theme, $isSidebarVisible }) => ({
  background: $theme.colors.backgroundTertiary,
  minHeight: "100vh",

  [$theme.mediaQuery.large]: {
    paddingLeft: $isSidebarVisible ? SIDEBAR_WIDTH : 0,
  },
}));

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

function Sidebar({ visible, onClose }: SidebarProps) {
  const pathname = usePathname();
  const {
    state: { theme },
  } = useThemeState();
  return (
    <ResponsiveSidebarContainer $visible={visible} onClose={onClose}>
      <ResponsiveCloseSidebarOverlay $visible={visible} onClick={onClose} />
      <div style={{ padding: "1.5em" }}>
        <Logo width={160} />
      </div>

      <ul>
        <SidebarNavItem
          href="./"
          icon={<Dashboard size={25} />}
          active={pathname == "/"}
        >
          Dashboard
        </SidebarNavItem>

        <SidebarNavItem
          href="./processes"
          icon={<Leaf size={25} />}
          active={pathname.includes("/processes")}
        >
          Processos
        </SidebarNavItem>
      </ul>
    </ResponsiveSidebarContainer>
  );
}

const ResponsiveSidebarContainer = styled<
  "aside",
  { $visible: boolean; onClose: () => void }
>("aside", ({ $theme, $visible }) => ({
  display: $visible ? "block" : "none",
  position: "fixed",
  left: 0,
  height: "100vh",
  width: SIDEBAR_WIDTH,
  background: $theme.colors.backgroundSecondary,

  // TODO: add zIndex to theme
  zIndex: 10,

  // Internal Layout
  overflow: "auto",
}));

const ResponsiveCloseSidebarOverlay = styled<"div", { $visible: boolean }>(
  "div",
  ({ $theme, $visible }) => ({
    display: $visible ? "block" : "none",
    position: "fixed",
    top: "0",
    left: SIDEBAR_WIDTH,
    width: "100vw",
    background: $theme.colors.backgroundOverlayDark,
    height: "100vh",

    [$theme.mediaQuery.large]: {
      display: "none",
    },
  })
);

function SidebarNavItem({
  icon,
  children,
  active,
  ...linkProps
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
} & LinkProps) {
  return (
    <li>
      <SidebarLink $active={active} {...linkProps}>
        {icon}
        <div style={{ marginRight: "1em" }} />
        {children}
      </SidebarLink>
    </li>
  );
}

const SidebarLink = styled<typeof Link, { $active: boolean }>(
  Link,
  ({ $theme, $active }) => ({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "1em",
    textDecoration: "none",
    color: $theme.colors.primary,
    background: $active ? $theme.colors.menuFill : undefined,

    ":hover": {
      background: $theme.colors.menuFillHover,
      fontWeight: "bold",
    },
  })
);

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarVisible: boolean;
}

function Header({ isSidebarVisible, onToggleSidebar }: HeaderProps) {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const [css] = useStyletron();
  const router = useRouter();
  return (
    <HeaderNavigation
      // @ts-expect-error
      className={css({
        padding: "0 5px 0 10px !important", // a bit more padding on the right for avatar
      })}
    >
      <NavigationList $align={ALIGN.left}>
        <NavigationItem style={{ padding: 0 }}>
          <Button size="mini" kind="tertiary" onClick={onToggleSidebar}>
            {isSidebarVisible ? (
              <MenuFold size={24} />
            ) : (
              <MenuUnfold size={24} />
            )}
          </Button>
        </NavigationItem>
      </NavigationList>

      <NavigationList $align={ALIGN.center} />

      <NavigationList $align={ALIGN.right} style={{ position: "relative" }}>
        <NavigationItem style={{ padding: 0 }}>
          <Button
            $as="div"
            size="mini"
            kind="tertiary"
            onClick={() => setIsMenuVisible((v) => !v)}
            role="button"
          >
            <Avatar
              name="Leonardo Lombardi"
              size={"40px"}
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=807"
            />
          </Button>
        </NavigationItem>

        {isMenuVisible && (
          <li
            style={{
              position: "absolute",
              top: "110%",
              zIndex: 10, // TODO: add zIndex to them
            }}
          >
            <OutsideClickListener
              onClickOutside={() => setIsMenuVisible(false)}
            >
              <StatefulMenu
                // @ts-expect-error
                style={{
                  position: "absolute",
                  top: "110%",
                  listStyle: "none",
                }}
                items={[
                  { label: "Perfil", link: "/profile" },
                  { label: "Configurações", link: "/settings" },
                  { divider: true },
                  { label: "Logout" },
                ]}
                onItemSelect={({ item, event }) => {
                  event?.preventDefault();
                  if (item.label == "Logout") {
                    return router.push("/signin");
                  }

                  router.push(item.link);
                  setIsMenuVisible(false);
                }}
                overrides={{
                  List: { style: { width: "350px" } },
                }}
              />
            </OutsideClickListener>
          </li>
        )}
      </NavigationList>
    </HeaderNavigation>
  );
}

const NON_AUTHENTICATED_ROUTES = ["/signin", "/signup"];

function AppBreadcrumbs() {
  const [css] = useStyletron();
  const breadcrumbs = useBreadcrumbs();
  const pathname = usePathname();

  // Do not show breadcrumbs on homepage or non authenticated routes
  // TODO: use authentication state to determine this
  if (pathname === "/" || NON_AUTHENTICATED_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <div className={css({ padding: "1em 1em 0" })}>
      <Breadcrumbs>
        {breadcrumbs.map((crumb, index) => (
          <Crumb
            key={crumb.text}
            href={crumb.href}
            last={index === breadcrumbs.length - 1}
          >
            {crumb.text}
          </Crumb>
        ))}
      </Breadcrumbs>
    </div>
  );
}

function Crumb({
  children,
  href,
  last,
}: {
  children: React.ReactNode;
  href: string;
  last: boolean;
}) {
  const [css, theme] = useStyletron();

  if (last) {
    return (
      <span
        className={css({
          color: theme.colors.inputPlaceholder,
          fontWeight: "bold",
        })}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={css({
        color: theme.colors.inputPlaceholder,
        textDecoration: "none",
        ":hover": {
          color: theme.colors.linkText,
        },
      })}
    >
      {children}
    </Link>
  );
}

function useBreadcrumbs() {
  const pathname = usePathname();

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const subpaths = pathname.split("/").filter((v) => v.length > 0);
  const crumblist = subpaths.map((subpath, index) => {
    const href = "/" + subpaths.slice(0, index + 1).join("/");
    const translatedSubpath = translateSubpath(subpath);
    return { href, text: capitalizeFirstLetter(translatedSubpath) };
  });

  // Add in a default "Home" crumb for the top-level
  return [{ href: "/", text: "Dashboard" }, ...crumblist];
}

function translateSubpath(subpath: string) {
  switch (subpath) {
    case "processes":
      return "Processos";

    case "create":
      return "Criar";

    case "profile":
      return "Perfil";

    case "settings":
      return "Configurações";

    case "certifications":
      return "Certificações";

    case "plans":
      return "Planos";

    default:
      return subpath;
  }
}
