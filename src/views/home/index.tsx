import BottomNavigation from "@/widgets/layout/ui/BottomNavigation";
import GNB from "@/widgets/layout/ui/GNB";

import { getCategoriesApi } from "@/entities/category/api/category.server";
import CategoryItem from "@/entities/category/ui/CategoryItem";

import styles from "./index.module.scss";

export default async function Home() {
  const categories = await getCategoriesApi();

  return (
    <main className={styles.wrapper}>
      <GNB />
      <h1>Home</h1>
      <div className={styles.categoryWrapper}>
        {categories.data.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
      <BottomNavigation />
    </main>
  );
}
