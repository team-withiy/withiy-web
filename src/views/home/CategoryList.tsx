import { range } from "lodash-es";

import { getCategoriesApi } from "@/entities/category/api/category.server";
import CategoryItem, { LoadingCategoryItem } from "@/entities/category/ui/CategoryItem";

import styles from "./CategoryList.module.scss";

const CategoryList: React.FC = async () => {
  const categories = await getCategoriesApi();

  return (
    <div className={styles.wrapper}>
      {categories.data.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;

export const LoadingCategoryList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {range(5).map((value) => (
        <LoadingCategoryItem key={value} />
      ))}
    </div>
  );
};
