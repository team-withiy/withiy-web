import { faker } from "@faker-js/faker";
import { range } from "lodash-es";
import { HttpResponse } from "msw";

import { serverHttpHandler } from "@/app/mocks/httpHandler";

import { PlaceDetailDTO } from "@/entities/place/api/place.interface";

import type { ApiResponseDTO } from "@/shared/api/common.interface";

import { mockCategory } from "./category.handler";

faker.seed(1);
faker.setDefaultRefDate(new Date("2023-01-01T00:00:00Z"));

export const mockPlaceDetail: PlaceDetailDTO = {
  placeId: faker.number.int({ min: 1, max: 1000 }),
  placeName: faker.company.name(),
  category: mockCategory,
  address: faker.location.streetAddress({ useFullAddress: true }),
  location: {
    latitude: faker.location.latitude({ min: 37.4, max: 37.7, precision: 6 }).toString(),
    longitude: faker.location.longitude({ min: 126.8, max: 127.2, precision: 6 }).toString(),
    region1depth: faker.helpers.arrayElement(["서울특별시", "경기도", "인천광역시"]),
    region2depth: faker.helpers.arrayElement(["강남구", "서초구", "마포구", "용산구", "종로구"]),
    region3depth: faker.helpers.arrayElement(["역삼동", "논현동", "청담동", "압구정동", "신사동"]),
  },
  score: faker.number.int({ min: 1, max: 5 }),
  photos: range(faker.number.int({ min: 1, max: 5 })).map(() => ({
    photoId: faker.number.int({ min: 1, max: 1000 }),
    imageUrl: faker.image.url({ width: 640, height: 480 }),
    uploader: {
      userId: faker.number.int({ min: 1, max: 100 }),
      nickname: faker.person.fullName(),
      thumbnail: faker.image.avatar(),
    },
  })),
  reviews: range(faker.number.int({ min: 0, max: 10 })).map(() => ({
    reviewId: faker.number.int({ min: 1, max: 1000 }),
    reviewer: {
      userId: faker.number.int({ min: 1, max: 100 }),
      nickname: faker.person.fullName(),
      thumbnail: faker.image.avatar(),
    },
    contents: faker.lorem.sentences({ min: 1, max: 3 }),
    imageUrls: range(faker.number.int({ min: 0, max: 3 })).map(() => faker.image.url({ width: 640, height: 480 })),
    score: faker.number.int({ min: 1, max: 5 }),
  })),
};

const getPlaceDetail = serverHttpHandler.get<{ placeId: string }, undefined, ApiResponseDTO<PlaceDetailDTO>>(
  "/api/places/detail/:placeId",
  ({ params }) => {
    return HttpResponse.json(
      {
        data: { ...mockPlaceDetail, placeId: Number(params.placeId) },
        message: "success",
        status: 200,
        timestamp: faker.date.past(),
      },
      { status: 200 },
    );
  },
);

export const placeHandlers = [getPlaceDetail];
