import { useCallback, useMemo } from "react";

import { AlertEventEmitter } from "./AlertEventEmitter";

import type { AlertShowType } from "./alert.interface";

interface ReturnUseAlert {
  showAlert: (alert: AlertShowType) => void;
  closeAlert: () => void;
}

const useAlert = (): ReturnUseAlert => {
  const showAlert = useCallback((alert: AlertShowType) => {
    AlertEventEmitter.getInstance().show(alert);
  }, []);

  const closeAlert = useCallback(() => {
    AlertEventEmitter.getInstance().close();
  }, []);

  return useMemo(() => ({ showAlert, closeAlert }), [closeAlert, showAlert]);
};

export default useAlert;
