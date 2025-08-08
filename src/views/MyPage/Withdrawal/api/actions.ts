"use server";

import { deleteUserApi } from "@/entities/user/api/user.server-mutations";

export const withdrawAction = async () => {
  await deleteUserApi();
};
