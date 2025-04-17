import cx from "clsx";

import styles from "./ScheduleCard.module.scss";

interface Props {
  className?: string;
}

const ScheduleCard: React.FC<Props> = ({ className }) => {
  return (
    <button type="button" className={cx(styles.wrapper, className)}>
      TODO
    </button>
  );
};

export default ScheduleCard;
