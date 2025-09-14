"use server";

import { notFound } from "next/navigation";

import { getServer } from "@/shared/api/apiServer";
import type { ApiResponseDTO } from "@/shared/api/common.interface";
import { NOT_FOUND_STATUS } from "@/shared/constants/auth";
import { isFetchHTTPError } from "@/shared/models/auth/fetchHTTPException";

import type { PlaceDetailDTO } from "./place.interface";

export const getPlaceDetailApi = async (placeId: number) =>
  getServer(`/api/places/${placeId}/detail`, {
    cache: "force-cache",
    tags: ["place", `places/${placeId}`],
  })
    .then((res) => res.json<ApiResponseDTO<PlaceDetailDTO>>())
    .catch((error) => {
      if (isFetchHTTPError(error) && error.status === NOT_FOUND_STATUS) return notFound();
      throw error;
    });
