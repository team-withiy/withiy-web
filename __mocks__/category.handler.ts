import { faker } from "@faker-js/faker";
import { range } from "lodash-es";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import type { CategoryDTO } from "@/entities/category/api/category.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockCategories: CategoryDTO[] = range(5).map(() => ({
  id: faker.number.int(),
  name: faker.commerce.department(),
  icon: faker.image.url({ width: 32, height: 32 }),
}));

const getCategories = serverHttpHandler.get<{}, undefined, ApiResponseDTO<CategoryDTO[]>>("/api/categories", () => {
  return HttpResponse.json(
    {
      data: mockCategories,
      message: "success",
      status: 200,
      timestamp: faker.date.past(),
    },
    { status: 200 },
  );
});

export const categoryHandlers = [getCategories];
