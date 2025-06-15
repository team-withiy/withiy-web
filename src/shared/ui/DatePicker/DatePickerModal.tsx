"use client";

import BaseModal from "../BaseModal";
import { useDatePickerContext } from "./DatePickerContext";
import DatePickerFooter from "./DatePickerFooter";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerMonthContent from "./DatePickerMonthContent";
import DatePickerYearContent from "./DatePickerYearContent";

import styles from "./DatePickerModal.module.scss";

interface Props {
  isShow: boolean;
}

const DatePickerModal: React.FC<Props> = ({ isShow }) => {
  const { onCancel, viewMode } = useDatePickerContext();

  return (
    <BaseModal isShow={isShow} onClose={onCancel} className={styles.wrapper} blockCloseWhenClickOverlay>
      <DatePickerHeader />
      {viewMode === "year" && <DatePickerYearContent />}
      {viewMode === "month" && <DatePickerMonthContent />}
      <DatePickerFooter />
    </BaseModal>
  );
};

export default DatePickerModal;
