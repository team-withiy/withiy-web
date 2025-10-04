/** DEFAULT: 내 장소 폴더 | CUSTOM: 추가로 생성한 폴더 | VIRTUAL: 저장한 모든 장소 폴더 */
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

export interface UpdateFolderDTO extends CreateFolderDTO {
  folderId: number;
}
