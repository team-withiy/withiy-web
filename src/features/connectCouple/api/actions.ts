import { connectCoupleApi } from "@/entities/couple/api/couple.server-mutations";

import { type FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const connectCoupleAction = async (_: FormActionState, payload: FormData): Promise<FormActionState> => {
  try {
    const partnerCode = payload.get("partnerCode") as string;
    const firstMetDate = payload.get("firstMetDate") as string;

    await connectCoupleApi({ partnerCode, firstMetDate });

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
      message: "커플 연결에 실패했습니다. 다시 시도해주세요.",
    };
  }
};
