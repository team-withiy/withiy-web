import { EventEmitter } from "events";

import { ALERT_ACTION_MAPPER, type AlertCallbackType, type AlertShowType } from "./alert.interface";

export class AlertEventEmitter extends EventEmitter {
  readonly #eventName = "alert-event-emitter-event-name";
  static #instance: AlertEventEmitter;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!AlertEventEmitter.#instance) {
      AlertEventEmitter.#instance = new AlertEventEmitter();
    }
    return AlertEventEmitter.#instance;
  }

  addEventListener(callback: AlertCallbackType) {
    this.addListener(this.#eventName, callback);
  }

  removeEventListener(callback: AlertCallbackType) {
    this.removeListener(this.#eventName, callback);
  }

  show(alert: AlertShowType) {
    this.emit(this.#eventName, {
      action: (() => {
        if (alert.uiType === "oneButton") {
          return ALERT_ACTION_MAPPER.SHOW_ONE_BUTTON_ALERT;
        }
        if (alert.uiType === "twoButton") {
          return ALERT_ACTION_MAPPER.SHOW_TWO_BUTTON_ALERT;
        }
      })(),
      ...alert,
    });
  }

  close() {
    this.emit(this.#eventName, {
      action: ALERT_ACTION_MAPPER.CLOSE_ALERT,
    });
  }
}
