import Image from "next/image";
import Link from "next/link";

import cx from "clsx";

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
