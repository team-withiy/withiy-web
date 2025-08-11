import { SimpleUserDTO } from "@/entities/user/api/@x/review";

export interface ReviewDTO {
  reviewId: number;
  reviewer: SimpleUserDTO;
  contents: string;
  imageUrls: string[];
  score: number;
}
