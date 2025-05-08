import { createRef } from "react";

import { EventEmitter } from "events";

import { generateID } from "@/shared/lib/id";

import { TOAST_ACTION_MAPPER, type ToastAddType, type ToastCallbackType } from "./toast.interface";

export class ToastEventEmitter extends EventEmitter {
  readonly #eventName = "toast-event-emitter-event-name";
  static #instance: ToastEventEmitter;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!ToastEventEmitter.#instance) {
      ToastEventEmitter.#instance = new ToastEventEmitter();
    }
    return ToastEventEmitter.#instance;
  }

  addEventListener(callback: ToastCallbackType) {
    this.addListener(this.#eventName, callback);
  }

  removeEventListener(callback: ToastCallbackType) {
    this.removeListener(this.#eventName, callback);
  }

  add({ message, state }: ToastAddType) {
    this.emit(this.#eventName, {
      id: generateID("toast-"),
      action: TOAST_ACTION_MAPPER.ADD_TOAST,
      state,
      message,
      ref: createRef(),
    });
  }

  remove(id: string) {
    this.emit(this.#eventName, {
      id,
      action: TOAST_ACTION_MAPPER.REMOVE_TOAST,
    });
  }

  clear() {
    this.emit(this.#eventName, { action: TOAST_ACTION_MAPPER.CLEAR_TOASTS });
  }
}
