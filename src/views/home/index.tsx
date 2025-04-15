import BottomNavigation from "@/widgets/layout/ui/BottomNavigation";
import GNB from "@/widgets/layout/ui/GNB";

import styles from "./index.module.scss";

export default async function Home() {
  return (
    <main className={styles.wrapper}>
      <GNB />
      <h1>Home</h1>
      <div style={{ height: "2000px" }}></div>
      <h2>HOME</h2>
      <BottomNavigation />
    </main>
  );
}
