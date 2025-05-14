"use client";

import { useCallback, useEffect, useState } from "react";

import { ALERT_ACTION_MAPPER, type AlertCallbackType, type AlertItem } from "./alert.interface";
import { AlertEventEmitter } from "./AlertEventEmitter";
import BaseModal from "../BaseModal";
import Button from "../Button/Button";

import styles from "./Alert.module.scss";

const Alert: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [alert, setAlert] = useState<AlertItem | null>(null);

  const showAlert = useCallback((alert: AlertItem) => {
    setAlert(alert);
    setIsShow(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsShow(false);
  }, []);

  useEffect(() => {
    const eventCallback: AlertCallbackType = (alert) => {
      if (alert.action === ALERT_ACTION_MAPPER.SHOW_ONE_BUTTON_ALERT) showAlert(alert);
      if (alert.action === ALERT_ACTION_MAPPER.SHOW_TWO_BUTTON_ALERT) showAlert(alert);
      if (alert.action === ALERT_ACTION_MAPPER.CLOSE_ALERT) closeAlert();
    };

    AlertEventEmitter.getInstance().addEventListener(eventCallback);
    return () => {
      AlertEventEmitter.getInstance().removeEventListener(eventCallback);
    };
  }, [closeAlert, showAlert]);

  return (
    <BaseModal
      data-testid="alert-modal"
      blockCloseWhenClickOverlay
      isShow={isShow}
      onClose={closeAlert}
      className={styles.wrapper}
    >
      <section className={styles.textArea} data-testid="alert-content-section">
        <h2 className={styles.title} data-testid="alert-title">
          {alert?.title}
        </h2>
        <p className={styles.content} data-testid="alert-content">
          {alert?.content}
        </p>
      </section>
      <footer className={styles.footer} data-testid="alert-footer">
        <Button
          size={44}
          variant="default"
          full
          type="button"
          onClick={alert?.onConfirm}
          data-testid="alert-confirm-button"
        >
          {alert?.confirmText}
        </Button>
        {alert?.uiType === "twoButton" && (
          <Button
            size={44}
            variant="text"
            full
            type="button"
            onClick={alert.onCancel}
            data-testid="alert-cancel-button"
          >
            {alert.cancelText}
          </Button>
        )}
      </footer>
    </BaseModal>
  );
};

export default Alert;
