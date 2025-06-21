import type { ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import RequireAuthorizationWrapper from "@/features/checkAuthorization/ui/RequireAuthorizationWrapper";

import { IconBook24, IconCalendar24, IconHouse24, IconSearch24, IconUserRound24 } from "public/icons";

import styles from "./BottomNavigation.module.scss";

interface Item {
  href: string;
  label: string;
  icon: ReactNode;
  requiredAuth: boolean;
}

const ITEMS = [
  {
    href: "/",
    label: "홈",
    icon: <IconHouse24 />,
    requiredAuth: false,
  },
  {
    href: "/search",
    label: "검색",
    icon: <IconSearch24 />,
    requiredAuth: false,
  },
  {
    href: "/calendar",
    label: "일정",
    icon: <IconCalendar24 />,
    requiredAuth: false,
  },
  {
    href: "/albums",
    label: "앨범",
    icon: <IconBook24 />,
    requiredAuth: true,
  },
  {
    href: "/my-page",
    label: "마이페이지",
    icon: <IconUserRound24 />,
    requiredAuth: true,
  },
] as const satisfies Item[];

type Href = (typeof ITEMS)[number]["href"];

interface Props {
  currentHref: Href;
}

const BottomNavigation: React.FC<Props> = ({ currentHref }) => {
  return (
    <footer className={styles.wrapper} aria-label="Bottom navigation" data-testid="bottomNavigation">
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {ITEMS.map((item) => (
            <li key={item.href} className={styles.item} data-testid={item.label}>
              {item.requiredAuth && (
                <RequireAuthorizationWrapper
                  fallbackWrapperClassName={styles.link}
                  callbackUrl={item.href}
                  hasBottomSheet
                  fallback={
                    <div className={styles.link}>
                      <span className={styles.iconWrapper}>{item.icon}</span>
                      {item.label}
                    </div>
                  }
                >
                  <Link
                    href={item.href}
                    className={cx(styles.link, { [styles.active]: item.href === currentHref })}
                    data-testid={`${item.label}-link`}
                  >
                    <span className={styles.iconWrapper}>{item.icon}</span>
                    {item.label}
                  </Link>
                </RequireAuthorizationWrapper>
              )}
              {!item.requiredAuth && (
                <Link
                  href={item.href}
                  className={cx(styles.link, { [styles.active]: item.href === currentHref })}
                  data-testid={`${item.label}-link`}
                >
                  <span className={styles.iconWrapper}>{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
