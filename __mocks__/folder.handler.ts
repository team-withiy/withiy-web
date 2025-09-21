import { faker } from "@faker-js/faker";
import { range } from "lodash-es";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import { FolderOptionDTO, FolderSummaryDTO, FolderType } from "@/entities/folder/api/folder.interface";
import { FOLDER_COLORS } from "@/entities/folder/constants/folder";
import { PlaceSummaryDTO } from "@/entities/place/api/place.interface";

import type {
  ApiResponseDTO,
  CursorPaginationResponseDTO,
  MockCursorPaginationRequestParams,
} from "@/shared/api/common.interface";
import { createCursorPaginationResponse } from "@/shared/models/mocks/pagination";

import { mockCategories } from "./category.handler";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockFolderOptions: FolderOptionDTO[] = range(5).map(() => ({
  id: faker.number.int(),
  bookmarkCount: faker.number.int(),
  bookmarked: faker.datatype.boolean(),
  color: faker.helpers.arrayElement(FOLDER_COLORS),
  createdAt: faker.date.past(),
  name: faker.lorem.words(2),
}));

const getFolderOptions = serverHttpHandler.get<{ placeId: string }, undefined, ApiResponseDTO<FolderOptionDTO[]>>(
  "/api/folders/select",
  () => {
    return HttpResponse.json(
      {
        data: mockFolderOptions,
        message: "success",
        status: 200,
        timestamp: faker.date.past(),
      },
      { status: 200 },
    );
  },
);

export const mockFolderAll: PlaceSummaryDTO[] = range(10).map((value) => ({
  placeId: value,
  address: faker.location.streetAddress({ useFullAddress: true }),
  category: mockCategories[value % mockCategories.length],
  imageUrls: range(faker.number.int({ min: 1, max: 3 })).map(() => faker.image.url({ width: 640, height: 480 })),
  placeName: faker.company.name(),
  score: faker.number.int({ min: 1, max: 100 }),
}));

const getFolderAll = serverHttpHandler.get<
  MockCursorPaginationRequestParams,
  undefined,
  CursorPaginationResponseDTO<PlaceSummaryDTO>
>("/api/folders/all", ({ params }) => {
  const { limit: limitParam, cursor: cursorParam, prev } = params;
  const limit = Number(limitParam);
  const cursor = cursorParam ? Number(cursorParam) : null;
  const isPrev = prev === "true";

  const response = createCursorPaginationResponse(mockFolderAll, cursor, limit, isPrev, "placeId", "desc");

  return HttpResponse.json(response, { status: 200 });
});

export const mockFolders: FolderSummaryDTO[] = range(5).map(() => ({
  id: faker.number.int(),
  name: faker.lorem.words(2),
  color: faker.helpers.arrayElement(FOLDER_COLORS),
  bookmarkCount: faker.number.int(),
  thumbnails: range(faker.number.int({ min: 1, max: 3 })).map(() => faker.image.url({ width: 640, height: 480 })),
  type: faker.helpers.arrayElement<FolderType>(["DEFAULT", "CUSTOM", "VIRTUAL"]),
  createdAt: faker.date.past(),
}));

const getFolders = serverHttpHandler.get<{}, undefined, ApiResponseDTO<FolderSummaryDTO[]>>("/api/folders", () => {
  return HttpResponse.json(
    { data: mockFolders, message: "success", status: 200, timestamp: faker.date.past() },
    { status: 200 },
  );
});

export const folderHandlers = [getFolderOptions, getFolderAll, getFolders];
