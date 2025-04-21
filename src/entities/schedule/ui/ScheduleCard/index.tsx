import cx from "clsx";

import styles from "./ScheduleCard.module.scss";

interface Props {
  className?: string;
}

// TODO: authorization 후 스케쥴 연동 필요.
// TODO: 로그인하지 않았다면 바텀시트 노출
const ScheduleCard: React.FC<Props> = ({ className }) => {
  return (
    <button type="button" className={cx(styles.wrapper, className)}>
      TODO
    </button>
  );
};

export default ScheduleCard;
