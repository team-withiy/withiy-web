import FolderDetailHeader from "./FolderDetailHeader";
import PlaceList from "./PlaceList";
import Title from "./Title";

import styles from "./FolderDetailPage.module.scss";

const FolderDetailPage: React.FC = () => {
  return (
    <main className={styles.wrapper} data-testid="folder-detail-page">
      <FolderDetailHeader />
      <Title />
      <PlaceList />
    </main>
  );
};

export default FolderDetailPage;
