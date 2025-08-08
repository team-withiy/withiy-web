"use server";

import { uploadImageApi } from "@/entities/image/api/image.server-mutations";
import { updateProfileApi } from "@/entities/user/api/user.server-mutations";

interface UpdateProfileActionPayload {
  nickname: string;
  thumbnail?: File;
}

export const updateProfileAction = async ({ nickname, thumbnail }: UpdateProfileActionPayload) => {
  if (!!thumbnail) {
    const { data } = await uploadImageApi({ entityType: "user", file: thumbnail });
    await updateProfileApi({ nickname, thumbnail: data.imageUrl });
  } else {
    await updateProfileApi({ nickname });
  }
};
