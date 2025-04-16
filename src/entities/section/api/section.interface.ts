import type { CategoryDTO } from "@/entities/category/api/@x/course";
import type { CoursePlaceDTO } from "@/entities/course/api/@x/section";

export type SectionType = "place" | "course";
export type SectionUiType = "horizontal";

export interface HomeSectionDTO {
  id: number;
  title: string;
  order: number;
  uiType: SectionUiType;
  category: CategoryDTO;
}

export interface SectionPlaceDTO {
  id: number;
  name: string;
  thumbnail: string;
  address: string;
  latitude: string;
  longitude: string;
  category: CategoryDTO;
  score: number;
  order: number;
}

export interface SectionCourseDTO {
  id: number;
  name: string;
  order: number;
  thumbnail: string;
  score: number;
  places: CoursePlaceDTO[];
}
