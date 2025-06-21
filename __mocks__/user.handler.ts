import { faker } from "@faker-js/faker";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import { UserDTO, UserProfileResponseDTO } from "@/entities/user/api/user.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockUserWithoutRegistered: UserDTO = {
  nickname: faker.person.firstName(),
  thumbnail: faker.image.avatar(),
  restoreEnabled: false,
  isRegistered: false,
  code: faker.string.alphanumeric(6),
  hasCouple: false,
};

export const mockUserRestoreEnabled: UserDTO = {
  nickname: faker.person.firstName(),
  thumbnail: faker.image.avatar(),
  restoreEnabled: true,
  isRegistered: false,
  code: faker.string.alphanumeric(6),
  hasCouple: false,
};

export const mockUserWithoutCouple: UserDTO = {
  nickname: faker.person.firstName(),
  thumbnail: faker.image.avatar(),
  restoreEnabled: false,
  isRegistered: true,
  code: faker.string.alphanumeric(6),
  hasCouple: false,
};

export const mockUserWithCouple: UserDTO = {
  ...mockUserWithoutCouple,
  hasCouple: true,
  couple: {
    id: faker.number.int(),
    connectedDate: "2023-01-02",
    firstMetDate: "2023-01-01",
    partnerNickname: faker.person.firstName(),
    partnerThumbnail: faker.image.avatar(),
  },
};

const getMe = serverHttpHandler.get<{}, undefined, ApiResponseDTO<UserDTO>>("/api/users/me", () => {
  return HttpResponse.json(
    {
      data: mockUserWithoutCouple,
      message: "success",
      status: 200,
      timestamp: faker.date.past(),
    },
    { status: 200 },
  );
});

const getUserProfileByCode = serverHttpHandler.get<{}, { userCode: string }, ApiResponseDTO<UserProfileResponseDTO>>(
  "/api/users/profile/:userCode",
  () => {
    return HttpResponse.json(
      {
        data: {
          userCode: faker.string.alphanumeric(6),
          nickname: faker.person.firstName(),
          profileImageUrl: faker.image.avatar(),
          hasCouple: faker.datatype.boolean(),
        },
        message: "success",
        status: 200,
        timestamp: faker.date.past(),
      },
      { status: 200 },
    );
  },
);

export const userHandlers = [getMe, getUserProfileByCode];
