import { range } from "lodash-es";

import { CategoryDTO } from "@/entities/category/api/category.interface";
import CategoryItem, { LoadingCategoryItem } from "@/entities/category/ui/CategoryItem";

import styles from "./CategoryList.module.scss";

interface Props {
  categories: CategoryDTO[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      {categories.map((category) => (
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
