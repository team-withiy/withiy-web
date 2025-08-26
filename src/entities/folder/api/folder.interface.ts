export type FolderColor = "PINK" | "RED" | "ORANGE" | "YELLOW" | "GREEN" | "SKY_BLUE" | "BLUE" | "GRAY";

export interface FolderOptionDTO {
  id: number;
  name: string;
  color: string;
  bookmarkCount: number;
  createdAt: Date;
  bookmarked: boolean;
}

export interface FolderSummaryDTO {
  id: number;
  name: string;
  color: string;
  bookmarkCount: number;
  thumbnails: string[];
  createdAt: Date;
}

export interface CreateFolderDTO {
  name: string;
  color: FolderColor;
  normalizedName: string;
}
