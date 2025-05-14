import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";

export async function DELETE() {
  const response = NextResponse.json({});
  response.cookies.delete(ACCESS_TOKEN_KEY);
  response.cookies.delete(REFRESH_TOKEN_KEY);

  revalidatePath("/", "layout");
  return response;
}
