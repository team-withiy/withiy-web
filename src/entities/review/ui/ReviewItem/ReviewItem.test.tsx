import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import ReviewItem from ".";
import type { ReviewDTO } from "../../api/review.interface";

const mockReview: ReviewDTO = {
  reviewId: 1,
  reviewer: {
    userId: 1,
    nickname: "테스트 사용자",
    thumbnail: "https://example.com/avatar.jpg",
  },
  contents: "정말 좋은 장소였어요! 분위기도 좋고 음식도 맛있었습니다.",
  imageUrls: ["https://example.com/image1.jpg", "https://example.com/image2.jpg", "https://example.com/image3.jpg"],
  score: 5,
};

const mockReviewWithManyImages: ReviewDTO = {
  ...mockReview,
  reviewId: 2,
  imageUrls: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
    "https://example.com/image4.jpg",
    "https://example.com/image5.jpg",
    "https://example.com/image6.jpg",
  ],
};

afterEach(() => {
  cleanup();
});

test("리뷰 정보가 정상적으로 렌더링되어야 한다.", () => {
  render(<ReviewItem review={mockReview} />);

  expect(screen.getByTestId(`${mockReview.reviewId}-review-item`)).toBeInTheDocument();
  expect(screen.getByTestId("reviewer-nickname")).toHaveTextContent(mockReview.reviewer.nickname);
  expect(screen.getByTestId("review-contents")).toHaveTextContent(mockReview.contents);
  expect(screen.getByTestId("review-score-value")).toHaveTextContent(`${mockReview.score}도`);
});

test("리뷰어 프로필 이미지가 올바르게 표시되어야 한다.", () => {
  render(<ReviewItem review={mockReview} />);

  const profileImage = screen.getByTestId("reviewer-thumbnail");
  expect(profileImage).toBeInTheDocument();
  expect(profileImage).toHaveAttribute("src", mockReview.reviewer.thumbnail);
});

test("리뷰 이미지들이 올바르게 표시되어야 한다.", () => {
  render(<ReviewItem review={mockReview} />);

  mockReview.imageUrls.forEach((_, index) => {
    const reviewImage = screen.getByTestId(`review-image-${index}`);
    expect(reviewImage).toBeInTheDocument();
    expect(reviewImage).toHaveAttribute("src", mockReview.imageUrls[index]);
  });
});

test("이미지가 4개를 초과하면 최대 4개까지만 표시되어야 한다.", () => {
  render(<ReviewItem review={mockReviewWithManyImages} />);

  for (let i = 0; i < 4; i++) {
    expect(screen.getByTestId(`review-image-${i}`)).toBeInTheDocument();
  }

  expect(screen.queryByTestId("review-image-4")).not.toBeInTheDocument();
  expect(mockReviewWithManyImages.imageUrls.length).toBeGreaterThan(4);
});

test("평점 아이콘과 함께 점수가 표시되어야 한다.", () => {
  render(<ReviewItem review={mockReview} />);

  const scoreElement = screen.getByTestId("review-score-value");
  expect(scoreElement).toBeInTheDocument();
  expect(scoreElement).toHaveTextContent(`${mockReview.score}도`);

  const scoreSection = screen.getByTestId("review-score");
  expect(scoreSection).toBeInTheDocument();
});

test("className prop이 올바르게 적용되어야 한다.", () => {
  const customClassName = "custom-review-item";
  render(<ReviewItem review={mockReview} className={customClassName} />);

  const reviewElement = screen.getByTestId(`${mockReview.reviewId}-review-item`);
  expect(reviewElement).toHaveClass(customClassName);
});

test("이미지가 없는 리뷰도 정상적으로 렌더링되어야 한다.", () => {
  const reviewWithoutImages: ReviewDTO = {
    ...mockReview,
    reviewId: 3,
    imageUrls: [],
  };

  render(<ReviewItem review={reviewWithoutImages} />);

  expect(screen.getByTestId(`${reviewWithoutImages.reviewId}-review-item`)).toBeInTheDocument();
  expect(screen.getByTestId("review-contents")).toHaveTextContent(reviewWithoutImages.contents);
  expect(screen.getByTestId("review-images")).toBeInTheDocument();
  expect(screen.queryByTestId("review-image-0")).not.toBeInTheDocument();
});

test("긴 닉네임도 올바르게 표시되어야 한다.", () => {
  const reviewWithLongNickname: ReviewDTO = {
    ...mockReview,
    reviewer: {
      ...mockReview.reviewer,
      nickname: "아주아주아주긴닉네임을가진사용자",
    },
  };

  render(<ReviewItem review={reviewWithLongNickname} />);

  expect(screen.getByTestId("reviewer-nickname")).toHaveTextContent(reviewWithLongNickname.reviewer.nickname);
});
