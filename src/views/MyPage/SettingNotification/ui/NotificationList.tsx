"use client";

import type { UserNotificationSettingResponseDTO } from "@/entities/user/api/user.interface";

import Toggle from "@/shared/ui/Toggle";

import { NotificationTypeMapper } from "../models/notification";

import styles from "./NotificationList.module.scss";

interface Props {
  notificationSettings: UserNotificationSettingResponseDTO;
}

const NotificationList: React.FC<Props> = ({ notificationSettings }) => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.DATE}>
            {NotificationTypeMapper.DATE}
            <Toggle
              checked={notificationSettings.dateNotificationEnabled}
              aria-labelledby={NotificationTypeMapper.DATE}
            />
          </label>
        </li>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.EVENT}>
            {NotificationTypeMapper.EVENT}
            <Toggle
              checked={notificationSettings.eventNotificationEnabled}
              aria-labelledby={NotificationTypeMapper.EVENT}
            />
          </label>
        </li>
      </ul>
    </section>
  );
};

export default NotificationList;

export const LoadingNotificationList: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.DATE}>
            {NotificationTypeMapper.DATE}
            <Toggle checked={false} readOnly disabled aria-labelledby={NotificationTypeMapper.DATE} />
          </label>
        </li>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.EVENT}>
            {NotificationTypeMapper.EVENT}
            <Toggle checked={false} readOnly disabled aria-labelledby={NotificationTypeMapper.EVENT} />
          </label>
        </li>
      </ul>
    </section>
  );
};
