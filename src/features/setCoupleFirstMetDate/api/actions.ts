"use server";

import { setFirstMetDateApi } from "@/entities/couple/api/couple.server-mutations";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

// TODO: 테스트 코드
export const setFirstMetDateAction = async (_: FormActionState, payload: FormData): Promise<FormActionState> => {
  try {
    const firstMetDate = payload.get("firstMetDate") as string;
    await setFirstMetDateApi({ firstMetDate });

    return {
      status: FormActionStatus.Success,
    };
  } catch (error) {
    if (isFetchHTTPError(error)) {
      return {
        status: FormActionStatus.Error,
        message: error.message,
      };
    }
    return {
      status: FormActionStatus.Error,
      message: "처음 만난 날짜 설정에 실패했습니다. 다시 시도해주세요.",
    };
  }
};
