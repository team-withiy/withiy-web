"use client";

import { ChangeEventHandler, startTransition, useOptimistic } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";
import { useToast } from "@/shared/ui/Toast";
import Toggle from "@/shared/ui/Toggle";

import { updateNotificationSettingsAction } from "../api/actions";
import { NotificationTypeMapper } from "../models/notification";

import styles from "./NotificationList.module.scss";

const NotificationList: React.FC = () => {
  const { addToast } = useToast();
  const { data, refetch } = useSuspenseQuery(userQueries.getNotificationSettings);
  const [optimisticSettings, setOptimisticSettings] = useOptimistic(data.data);

  const onChangeToggle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.currentTarget.name;
    const isChecked = e.currentTarget.checked;

    startTransition(async () => {
      setOptimisticSettings((prev) => ({ ...prev, [name]: isChecked }));
      const { userId, ...requestBody } = optimisticSettings;

      try {
        await updateNotificationSettingsAction({ ...requestBody, [name]: isChecked });
        await refetch();
      } catch (error) {
        const errorMessage = isFetchHTTPError(error) ? error.message : "알림 설정 업데이트에 실패했습니다.";
        addToast({ message: errorMessage, state: "danger" });
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

export default SSRSafeSuspense.with(NotificationList, {
  fallback: <LoadingNotificationList />,
});
