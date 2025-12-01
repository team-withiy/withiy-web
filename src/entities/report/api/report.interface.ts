export interface CreateReportRequestDTO {
  target: "PHOTO" | "PLACE";
  reason: "PHOTO_INAPPROPRIATE" | "PLACE_INACCURATE";
  contents: string;
  targetId: number;
}
