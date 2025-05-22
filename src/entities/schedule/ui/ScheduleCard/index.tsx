import cx from "clsx";

import styles from "./ScheduleCard.module.scss";

interface Props {
  className?: string;
}

// TODO: authorization 후 스케쥴 연동 필요.
const ScheduleCard: React.FC<Props> = ({ className }) => {
  return (
    <button type="button" className={cx(styles.wrapper, className)}>
      로그인한 사람만 클릭 가능
    </button>
  );
};

export default ScheduleCard;
