import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import type { PlaceSummaryDTO } from "@/entities/place/api/place.interface";

import PlaceInfo from "./PlaceInfo.server";

vi.mock("@/features/toggleBookmark/ui/Place", () => ({
  default: ({ placeId }: { placeId: number }) => <button data-testid={`favorite-button-${placeId}`}>저장</button>,
}));

const mockPlace: PlaceSummaryDTO = {
  placeId: 1,
  placeName: "테스트 카페",
  category: {
    id: 1,
    name: "카페",
    icon: "https://example.com/cafe-icon.png",
  },
  address: "서울특별시 강남구 테헤란로 123",
  score: 4.5,
  imageUrls: [],
};

const mockPlaceWithHighScore: PlaceSummaryDTO = {
  ...mockPlace,
  placeId: 2,
  placeName: "인기 맛집",
  score: 5.0,
  category: {
    id: 2,
    name: "한식",
    icon: "https://example.com/korean-icon.png",
  },
};

const mockPlaceWithLowScore: PlaceSummaryDTO = {
  ...mockPlace,
  placeId: 3,
  placeName: "새로운 장소",
  score: 2.0,
  category: {
    id: 3,
    name: "기타",
    icon: "https://example.com/etc-icon.png",
  },
};

afterEach(() => {
  cleanup();
});

test("장소 정보가 정상적으로 렌더링되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  expect(screen.getByTestId("place-info-title")).toHaveTextContent(mockPlace.placeName);
  expect(screen.getByText(mockPlace.category.name)).toBeInTheDocument();
  expect(screen.getByText(mockPlace.address)).toBeInTheDocument();
  expect(screen.getByText(`${mockPlace.score}도`)).toBeInTheDocument();
});

test("카테고리 아이콘이 올바르게 표시되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  const categoryIcon = screen.getByTestId("category-icon");
  expect(categoryIcon).toBeInTheDocument();
  expect(categoryIcon).toHaveAttribute("src", mockPlace.category.icon);
  expect(categoryIcon).toHaveAttribute("alt", mockPlace.category.name);
});

test("저장 버튼이 올바른 placeId로 렌더링되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  const favoriteButton = screen.getByTestId(`favorite-button-${mockPlace.placeId}`);
  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteButton).toHaveTextContent("저장");
});

test("길찾기 버튼이 렌더링되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  const directionButton = screen.getByTestId("find-road-button");
  expect(directionButton).toBeInTheDocument();
  expect(directionButton).toHaveTextContent("길찾기");
  expect(directionButton).toHaveAttribute("type", "button");
});

test("평점 버튼이 올바른 점수로 렌더링되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  const scoreButton = screen.getByTestId(`place-score-button`);
  expect(scoreButton).toBeInTheDocument();
  expect(scoreButton).toHaveTextContent(`${mockPlace.score}도`);
  expect(scoreButton).toHaveAttribute("type", "button");
});

test("높은 평점의 장소도 올바르게 표시되어야 한다.", () => {
  render(<PlaceInfo place={mockPlaceWithHighScore} />);

  expect(screen.getByTestId("place-info-title")).toHaveTextContent(mockPlaceWithHighScore.placeName);
  expect(screen.getByText(`${mockPlaceWithHighScore.score}도`)).toBeInTheDocument();
  expect(screen.getByText(mockPlaceWithHighScore.category.name)).toBeInTheDocument();
});

test("낮은 평점의 장소도 올바르게 표시되어야 한다.", () => {
  render(<PlaceInfo place={mockPlaceWithLowScore} />);

  expect(screen.getByTestId("place-info-title")).toHaveTextContent(mockPlaceWithLowScore.placeName);
  expect(screen.getByText(`${mockPlaceWithLowScore.score}도`)).toBeInTheDocument();
  expect(screen.getByText(mockPlaceWithLowScore.category.name)).toBeInTheDocument();
});

test("className prop이 올바르게 적용되어야 한다.", () => {
  const customClassName = "custom-place-info";
  render(<PlaceInfo place={mockPlace} className={customClassName} />);

  const section = screen.getByTestId("place-info");
  expect(section).toHaveClass(customClassName);
});

test("address 태그가 semantic하게 렌더링되어야 한다.", () => {
  render(<PlaceInfo place={mockPlace} />);

  const addressElement = screen.getByText(mockPlace.address);
  expect(addressElement.tagName.toLowerCase()).toBe("address");
});

test("긴 장소명도 올바르게 표시되어야 한다.", () => {
  const placeWithLongName: PlaceSummaryDTO = {
    ...mockPlace,
    placeName: "아주 긴 이름을 가진 장소입니다 정말로 매우 긴 이름이에요",
  };

  render(<PlaceInfo place={placeWithLongName} />);

  expect(screen.getByTestId("place-info-title")).toHaveTextContent(placeWithLongName.placeName);
});

test("긴 주소도 올바르게 표시되어야 한다.", () => {
  const placeWithLongAddress: PlaceSummaryDTO = {
    ...mockPlace,
    address: "서울특별시 강남구 테헤란로 123번길 45 ABC빌딩 지하 1층 101호 매우 긴 주소입니다",
  };

  render(<PlaceInfo place={placeWithLongAddress} />);

  expect(screen.getByText(placeWithLongAddress.address)).toBeInTheDocument();
});
