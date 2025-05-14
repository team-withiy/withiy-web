import type { Ref } from "react";

export const TOAST_TIMEOUT = 3_000;

export const TOAST_ACTION_MAPPER = {
  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
  CLEAR_TOASTS: "CLEAR_TOASTS",
} as const;

export type ToastState = "success" | "danger" | "default";
type ToastActionType = (typeof TOAST_ACTION_MAPPER)[keyof typeof TOAST_ACTION_MAPPER];

export interface ToastItem {
  id: string;
  action: ToastActionType;
  state: ToastState;
  message: string;
  ref: Ref<null>;
}

export type ToastAddType = Pick<ToastItem, "message" | "state">;

export type ToastCallbackType = (toast: Pick<ToastItem, "id" | "action"> | ToastItem) => void;
