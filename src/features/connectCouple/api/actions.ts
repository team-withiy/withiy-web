"use server";

import { redirect } from "next/navigation";

import { CoupleConnectionRequestDTO } from "@/entities/couple/api/couple.interface";
import { connectCoupleApi } from "@/entities/couple/api/couple.server-mutations";

import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

export const connectCoupleAction = async (body: CoupleConnectionRequestDTO) => {
  try {
    const { data } = await connectCoupleApi(body);
    redirect(`/couples/${data.id}`);
  } catch (error) {
    if (isFetchHTTPError(error)) return error.message;
    throw error;
  }
};
