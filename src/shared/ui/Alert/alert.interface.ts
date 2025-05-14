export const ALERT_UI_TYPE_MAPPER = {
  ONE_BUTTON: "oneButton",
  TWO_BUTTON: "twoButton",
} as const;

export type AlertUiType = (typeof ALERT_UI_TYPE_MAPPER)[keyof typeof ALERT_UI_TYPE_MAPPER];

export const ALERT_ACTION_MAPPER = {
  SHOW_ONE_BUTTON_ALERT: "SHOW_ONE_BUTTON_ALERT",
  SHOW_TWO_BUTTON_ALERT: "SHOW_TWO_BUTTON_ALERT",
  CLOSE_ALERT: "CLOSE_ALERT",
} as const;

export type AlertActionType = (typeof ALERT_ACTION_MAPPER)[keyof typeof ALERT_ACTION_MAPPER];

export type AlertItem = {
  action: Exclude<AlertActionType, "CLOSE_ALERT">;
  uiType: AlertUiType;
  title: string;
  content: string;
  cancelText?: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

type AlertCloseItem = {
  action: typeof ALERT_ACTION_MAPPER.CLOSE_ALERT;
};

export type AlertShowType = Omit<AlertItem, "action">;

export type AlertCallbackType = (alert: AlertItem | AlertCloseItem) => void;
