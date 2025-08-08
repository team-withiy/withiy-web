"use server";

import { restoreUserApi } from "@/entities/user/api/user.server-mutations";

export const cancelRestoreAction = async () => {
  await restoreUserApi({ restore: false });
};

export const restoreAction = async () => {
  await restoreUserApi({ restore: true });
};
