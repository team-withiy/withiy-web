"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import cx from "clsx";

import { IconBook24, IconCalendar24, IconHouse24, IconSearch24, IconUserRound24 } from "public/icons";

import styles from "./BottomNavigation.module.scss";

interface Item {
  href: string;
  label: string;
  icon: ReactNode;
}

const ITEMS: Item[] = [
  {
    href: "/",
    label: "홈",
    icon: <IconHouse24 />,
  },
  {
    href: "/search",
    label: "검색",
    icon: <IconSearch24 />,
  },
  {
    href: "/calendar",
    label: "일정",
    icon: <IconCalendar24 />,
  },
  {
    href: "/albums",
    label: "앨범",
    icon: <IconBook24 />,
  },
  {
    href: "/mypage",
    label: "마이페이지",
    icon: <IconUserRound24 />,
  },
];

// TODO: storybook
const BottomNavigation: React.FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <footer className={styles.wrapper} aria-label="Bottom navigation" data-testid="bottomNavigation">
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {ITEMS.map((item) => (
            <li key={item.href} className={styles.item} data-testid={item.label}>
              <Link
                href={item.href}
                className={cx(styles.link, { [styles.active]: item.href === `/${segment || ""}` })}
              >
                <span className={styles.iconWrapper}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
