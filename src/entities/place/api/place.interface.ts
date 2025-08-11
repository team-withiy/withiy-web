import type { CategoryDTO } from "@/entities/category/api/@x/place";
import type { LocationDTO } from "@/entities/location/api/@x/place";
import type { PhotoDTO } from "@/entities/photo/api/@x/place";
import type { ReviewDTO } from "@/entities/review/api/@x/place";

export interface PlaceDetailDTO {
  /** 장소 ID */
  placeId: number;
  /** 장소 이름 */
  placeName: string;
  /** 카테고리 */
  category: CategoryDTO;
  /** 장소 주소 */
  address: string;
  /** 장소 위치 */
  location: LocationDTO;
  /** 장소 온도 점수 */
  score: number;
  /** 장소 사진 목록 */
  photos: PhotoDTO[];
  /** 장소 리뷰 목록 */
  reviews: ReviewDTO;
}
