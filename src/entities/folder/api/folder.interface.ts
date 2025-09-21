export type FolderType = "DEFAULT" | "CUSTOM" | "VIRTUAL";

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
  type: FolderType;
  createdAt: Date;
}

export interface CreateFolderDTO {
  name: string;
  color: string;
}
