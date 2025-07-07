"use server";

import { uploadImageApi } from "@/entities/image/api/image.server-mutations";
import { updateProfileApi } from "@/entities/user/api/user.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

interface UpdateProfileActionPayload {
  nickname: string;
  thumbnail?: File;
}

export const updateProfileAction = async ({ nickname, thumbnail }: UpdateProfileActionPayload) => {
  try {
    if (!!thumbnail) {
      const { data } = await uploadImageApi({ entityType: "user", file: thumbnail });
      await updateProfileApi({ nickname, thumbnail: data.imageUrl });
    } else {
      await updateProfileApi({ nickname });
    }
  } catch (error) {
    if (isFetchHTTPError(error)) {
      return error.message;
    }

    return "프로필 업데이트에 실패했습니다. 다시 시도해주세요.";
  }
};
