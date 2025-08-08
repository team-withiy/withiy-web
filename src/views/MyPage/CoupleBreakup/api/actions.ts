"use server";

import { breakupCoupleApi } from "@/entities/couple/api/couple.server-mutations";

export const breakupCoupleAction = async () => {
  await breakupCoupleApi();
};
