"use server";

import { uploadImageApi } from "@/entities/image/api/image.server-mutations";
import type { RegisterUserInDTO } from "@/entities/user/api/user.interface";
import { registerUserApi } from "@/entities/user/api/user.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

interface RegisterActionPayload extends Omit<RegisterUserInDTO, "thumbnail"> {
  thumbnail?: File | string;
}

export const registerAction = async ({ nickname, termAgreements, thumbnail }: RegisterActionPayload) => {
  try {
    if (typeof thumbnail === "string") {
      await registerUserApi({
        nickname,
        termAgreements,
        thumbnail,
      });
    }

    if (typeof thumbnail === "object" && thumbnail instanceof File) {
      const { data } = await uploadImageApi({ entityType: "user", file: thumbnail });
      await registerUserApi({
        nickname,
        termAgreements,
        thumbnail: data.imageUrl,
      });
    }

    if (!thumbnail) {
      await registerUserApi({
        nickname,
        termAgreements,
      });
    }
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
