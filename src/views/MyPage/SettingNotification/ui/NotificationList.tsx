"use client";

import { ChangeEventHandler, startTransition, useOptimistic } from "react";

import type { UserNotificationSettingResponseDTO } from "@/entities/user/api/user.interface";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import { useToast } from "@/shared/ui/Toast";
import Toggle from "@/shared/ui/Toggle";

import { updateNotificationSettingsAction } from "../api/actions";
import { NotificationTypeMapper } from "../models/notification";

import styles from "./NotificationList.module.scss";

interface Props {
  notificationSettings: UserNotificationSettingResponseDTO;
}

const NotificationList: React.FC<Props> = ({ notificationSettings }) => {
  const { addToast } = useToast();
  const [optimisticSettings, setOptimisticSettings] = useOptimistic(notificationSettings);

  const onChangeToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    startTransition(async () => {
      setOptimisticSettings((prev) => ({ ...prev, [name]: isChecked }));

      try {
        await updateNotificationSettingsAction({ ...optimisticSettings, [name]: isChecked });
      } catch (error) {
        if (isFetchHTTPError(error)) {
          addToast({ message: error.message, state: "danger" });
        } else {
          addToast({ message: "알림 설정 업데이트에 실패했습니다.", state: "danger" });
        }
      }
    });
  };

  return (
    <section className={styles.wrapper} data-testid="notification-list">
      <ul className={styles.list}>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.DATE}>
            {NotificationTypeMapper.DATE}
            <Toggle
              onChange={onChangeToggle}
              name="dateNotificationEnabled"
              data-testid="date-notification-toggle"
              checked={optimisticSettings.dateNotificationEnabled}
              aria-labelledby={NotificationTypeMapper.DATE}
            />
          </label>
        </li>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.EVENT}>
            {NotificationTypeMapper.EVENT}
            <Toggle
              onChange={onChangeToggle}
              name="eventNotificationEnabled"
              data-testid="event-notification-toggle"
              checked={optimisticSettings.eventNotificationEnabled}
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
    <section className={styles.wrapper} data-testid="loading-notification-list">
      <ul className={styles.list}>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.DATE}>
            {NotificationTypeMapper.DATE}
            <Toggle
              checked={false}
              readOnly
              disabled
              data-testid="date-notification-toggle-loading"
              aria-labelledby={NotificationTypeMapper.DATE}
            />
          </label>
        </li>
        <li className={styles.item}>
          <label className={styles.label} id={NotificationTypeMapper.EVENT}>
            {NotificationTypeMapper.EVENT}
            <Toggle
              checked={false}
              readOnly
              disabled
              data-testid="event-notification-toggle-loading"
              aria-labelledby={NotificationTypeMapper.EVENT}
            />
          </label>
        </li>
      </ul>
    </section>
  );
};
