import { faker } from "@faker-js/faker";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import { UserDTO } from "@/entities/user/api/user.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockUser: UserDTO = {
  nickname: faker.person.firstName(),
  thumbnail: faker.image.avatar(),
  restoreEnabled: true,
  isRegistered: true,
  code: faker.string.alphanumeric(6),
};

const getMe = serverHttpHandler.get<{}, undefined, ApiResponseDTO<UserDTO>>("/api/users/me", () => {
  return HttpResponse.json(
    {
      data: mockUser,
      message: "success",
      status: 200,
      timestamp: faker.date.past(),
    },
    { status: 200 },
  );
});

export const userHandlers = [getMe];
