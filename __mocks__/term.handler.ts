import { faker } from "@faker-js/faker";
import { range } from "lodash-es";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import type { TermDTO } from "@/entities/term/api/term.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockTerms: TermDTO[] = range(5).map(() => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  content: range(3).map(() => faker.lorem.sentence()),
  required: faker.datatype.boolean(),
}));

const getTerms = serverHttpHandler.get<{}, undefined, ApiResponseDTO<TermDTO[]>>("/api/term", () => {
  return HttpResponse.json(
    {
      data: mockTerms,
      message: "success",
      status: 200,
      timestamp: faker.date.past(),
    },
    { status: 200 },
  );
});

export const termHandlers = [getTerms];
