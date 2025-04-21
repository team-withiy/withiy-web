"use client";

import Image from "next/image";

import { IconBell20, IconSearch24 } from "public/icons";
import { imageLogo } from "public/images";

import styles from "./GNB.module.scss";

// TODO: nav Link
// TODO: notification features로 분리
// TODO: 추후 로고 이미지 변경
// TODO: storybook
const GNB: React.FC = () => {
  return (
    <header className={styles.wrapper} data-testid="GNB">
      <Image src={imageLogo} alt="withiy logo" width={70} height={24} priority data-testid="logoImage" />
      <nav className={styles.right} data-testid="navigation">
        <ul>
          <li>
            <button type="button" aria-label="search" data-testid="searchButton">
              <IconSearch24 />
            </button>
          </li>
          <li>
            <button type="button" aria-label="notifications" data-testid="notificationButton">
              <IconBell20 />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
