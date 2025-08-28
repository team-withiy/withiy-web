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
  color: string;
}
