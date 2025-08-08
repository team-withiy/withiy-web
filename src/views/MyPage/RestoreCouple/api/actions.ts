"use server";

import { restoreCoupleApi } from "@/entities/couple/api/couple.server-mutations";

export const cancelRestoreCoupleAction = async () => {
  await restoreCoupleApi({ restore: false });
};

export const restoreCoupleAction = async () => {
  await restoreCoupleApi({ restore: true });
};
