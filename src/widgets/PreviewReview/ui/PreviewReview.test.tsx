import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import type { ReviewDTO } from "@/entities/review/api/review.interface";

import PreviewReview from ".";

const mockReview1: ReviewDTO = {
  reviewId: 1,
  reviewer: {
    userId: 1,
    nickname: "테스트 사용자 1",
    thumbnail: "https://example.com/avatar1.jpg",
  },
  contents: "정말 좋은 장소였어요! 분위기도 좋고 음식도 맛있었습니다.",
  imageUrls: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  score: 5,
};

const mockReview2: ReviewDTO = {
  reviewId: 2,
  reviewer: {
    userId: 2,
    nickname: "테스트 사용자 2",
    thumbnail: "https://example.com/avatar2.jpg",
  },
  contents: "괜찮은 곳이에요. 다시 오고 싶습니다.",
  imageUrls: ["https://example.com/image3.jpg"],
  score: 4,
};

const mockReview3: ReviewDTO = {
  reviewId: 3,
  reviewer: {
    userId: 3,
    nickname: "테스트 사용자 3",
    thumbnail: "https://example.com/avatar3.jpg",
  },
  contents: "평범한 장소입니다.",
  imageUrls: [],
  score: 3,
};

const mockReview4: ReviewDTO = {
  reviewId: 4,
  reviewer: {
    userId: 4,
    nickname: "테스트 사용자 4",
    thumbnail: "https://example.com/avatar4.jpg",
  },
  contents: "좋았어요.",
  imageUrls: ["https://example.com/image4.jpg"],
  score: 4,
};

const mockReview5: ReviewDTO = {
  reviewId: 5,
  reviewer: {
    userId: 5,
    nickname: "테스트 사용자 5",
    thumbnail: "https://example.com/avatar5.jpg",
  },
  contents: "추가 리뷰입니다.",
  imageUrls: ["https://example.com/image5.jpg"],
  score: 5,
};

const mockReviews = [mockReview1, mockReview2, mockReview3];
const mockManyReviews = [mockReview1, mockReview2, mockReview3, mockReview4, mockReview5];
const mockMoreHref = "/place/123/reviews";

afterEach(() => {
  cleanup();
});

test("리뷰가 4개 이하일 때 일반 모드로 렌더링되어야 한다.", () => {
  render(<PreviewReview reviews={mockReviews} moreHref={mockMoreHref} />);

  expect(screen.getByTestId("preview-review")).toBeInTheDocument();
  expect(screen.queryByTestId("dimmed-preview-review")).not.toBeInTheDocument();
  expect(screen.queryByTestId("dimmed-preview-review-overlay")).not.toBeInTheDocument();
  expect(screen.queryByTestId("dimmed-preview-review-button-wrapper")).not.toBeInTheDocument();
});

test("리뷰가 4개 초과일 때 딤드 모드로 렌더링되어야 한다.", () => {
  render(<PreviewReview reviews={mockManyReviews} moreHref={mockMoreHref} />);

  expect(screen.getByTestId("dimmed-preview-review")).toBeInTheDocument();
  expect(screen.getByTestId("dimmed-preview-review-overlay")).toBeInTheDocument();
  expect(screen.getByTestId("dimmed-preview-review-button-wrapper")).toBeInTheDocument();
  expect(screen.queryByTestId("preview-review")).not.toBeInTheDocument();
});

test("리뷰가 4개 초과일 때 최대 4개의 리뷰만 표시되어야 한다.", () => {
  render(<PreviewReview reviews={mockManyReviews} moreHref={mockMoreHref} />);

  expect(screen.getByTestId(`${mockReview1.reviewId}-review-item`)).toBeInTheDocument();
  expect(screen.getByTestId(`${mockReview2.reviewId}-review-item`)).toBeInTheDocument();
  expect(screen.getByTestId(`${mockReview3.reviewId}-review-item`)).toBeInTheDocument();
  expect(screen.getByTestId(`${mockReview4.reviewId}-review-item`)).toBeInTheDocument();

  expect(screen.queryByTestId(`${mockReview5.reviewId}-review-item`)).not.toBeInTheDocument();
});

test("더보기 버튼이 올바른 링크를 가져야 한다.", () => {
  render(<PreviewReview reviews={mockManyReviews} moreHref={mockMoreHref} />);

  const moreButtonLink = screen.getByRole("link");
  expect(moreButtonLink).toHaveAttribute("href", mockMoreHref);
  expect(screen.getByRole("button", { name: "더보기" })).toBeInTheDocument();
});

test("빈 리뷰 배열일 때도 정상적으로 렌더링되어야 한다.", () => {
  render(<PreviewReview reviews={[]} moreHref={mockMoreHref} />);

  expect(screen.getByTestId("preview-review")).toBeInTheDocument();
  expect(screen.queryByTestId("dimmed-preview-review")).not.toBeInTheDocument();
});

test("리뷰가 정확히 4개일 때 일반 모드로 렌더링되어야 한다.", () => {
  const exactlyFourReviews = [mockReview1, mockReview2, mockReview3, mockReview4];
  render(<PreviewReview reviews={exactlyFourReviews} moreHref={mockMoreHref} />);

  expect(screen.getByTestId("preview-review")).toBeInTheDocument();
  expect(screen.queryByTestId("dimmed-preview-review")).not.toBeInTheDocument();

  exactlyFourReviews.forEach((review) => {
    expect(screen.getByTestId(`${review.reviewId}-review-item`)).toBeInTheDocument();
  });
});

test("className prop이 올바르게 적용되어야 한다.", () => {
  const customClassName = "custom-preview-review";
  render(<PreviewReview reviews={mockReviews} moreHref={mockMoreHref} className={customClassName} />);

  const previewElement = screen.getByTestId("preview-review");
  expect(previewElement).toHaveClass(customClassName);
});

test("reviewItemClassName prop이 ReviewItem에 올바르게 전달되어야 한다.", () => {
  const customReviewItemClassName = "custom-review-item";
  render(
    <PreviewReview reviews={mockReviews} moreHref={mockMoreHref} reviewItemClassName={customReviewItemClassName} />,
  );

  const firstReviewItem = screen.getByTestId(`${mockReview1.reviewId}-review-item`);
  expect(firstReviewItem).toHaveClass(customReviewItemClassName);
});

test("딤드 모드에서 className prop이 올바르게 적용되어야 한다.", () => {
  const customClassName = "custom-dimmed-preview";
  render(<PreviewReview reviews={mockManyReviews} moreHref={mockMoreHref} className={customClassName} />);

  const dimmedElement = screen.getByTestId("dimmed-preview-review");
  expect(dimmedElement).toHaveClass(customClassName);
});
