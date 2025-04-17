import Image from "next/image";
import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { CategoryDTO } from "@/entities/category/api/category.interface";

import styles from "./CategoryItem.module.scss";

interface Props {
  category: CategoryDTO;
  className?: string;
}

const CategoryItem: React.FC<Props> = ({ category, className }) => {
  return (
    <Link href={`/categories/${category.id}`} className={cx(styles.wrapper, className)} data-testid="category-item">
      <figure className={styles.category} data-testid="category-figure">
        <div className={styles.imageWrapper}>
          <Image
            src={category.icon}
            alt={category.name}
            data-testid="category-icon"
            className={styles.image}
            width={32}
            height={32}
          />
        </div>
        <figcaption data-testid="category-name" className={styles.name}>
          {category.name}
        </figcaption>
      </figure>
    </Link>
  );
};

export default CategoryItem;

interface LoadingProps {
  className?: string;
}

export const LoadingCategoryItem: React.FC<LoadingProps> = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)} data-testid="loading-category-item">
      <figure className={styles.category} data-testid="loading-category-figure">
        <div className={styles.imageWrapper}>
          <Skeleton height={32} width={32} />
        </div>
        <figcaption data-testid="loading-category-name" className={styles.name}>
          <Skeleton width={50} />
        </figcaption>
      </figure>
    </div>
  );
};
