import type { ComponentProps } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import PlaceCarouselImage from "./PlaceCarouselImage";
import { mockPlaceDetail } from "__mocks__/place.handler";

import PlaceCarousel from ".";

afterEach(() => {
  cleanup();
});

vi.mock("react-slick");
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    return (props: ComponentProps<"div">) => <div {...props} />;
  },
}));

test("사진들이 정상적으로 렌더링되어야 한다.", async () => {
  const photos = mockPlaceDetail.photos;

  render(
    <PlaceCarousel totalPhotos={photos.length} clickPath={`/places/${mockPlaceDetail.placeId}/images`}>
      {photos.map((photo) => (
        <PlaceCarouselImage key={photo.imageUrl} photo={photo} />
      ))}
    </PlaceCarousel>,
  );

  expect(screen.getByTestId("place-carousel")).toBeInTheDocument();
  expect(screen.getByTestId("place-carousel-pages")).toHaveTextContent(`1 / ${photos.length}`);
  photos.forEach((photo) => {
    expect(screen.getByTestId(`${photo.photoId}-place-carousel-image`)).toBeInTheDocument();
  });
});

test("캐러셀을 클릭하면 이동해야 한다.", async () => {
  const user = userEvent.setup();
  const photos = mockPlaceDetail.photos;
  mockRouter.setCurrentUrl(`/places/${mockPlaceDetail.placeId}`);

  renderWithProviders(
    <PlaceCarousel totalPhotos={photos.length} clickPath={`/places/${mockPlaceDetail.placeId}/images`}>
      {photos.map((photo) => (
        <PlaceCarouselImage key={photo.imageUrl} photo={photo} />
      ))}
    </PlaceCarousel>,
  );

  const carousel = screen.getByTestId("place-carousel");
  await user.click(carousel);

  expect(mockRouter.asPath).toBe(`/places/${mockPlaceDetail.placeId}/images`);
});
