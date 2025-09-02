import { faker } from "@faker-js/faker";
import { range } from "lodash-es";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import { FolderOptionDTO } from "@/entities/folder/api/folder.interface";
import { FOLDER_COLORS } from "@/entities/folder/constants/folder";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

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

export const folderHandlers = [getFolderOptions];
