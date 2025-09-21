import { FolderSummaryDTO } from "../api/folder.interface";

export const checkIsFolderTypeCustom = (folder: Pick<FolderSummaryDTO, "type">) => {
  return folder.type === "CUSTOM";
};

export const checkIsFolderTypeDefault = (folder: Pick<FolderSummaryDTO, "type">) => {
  return folder.type === "DEFAULT";
};

export const checkIsFolderTypeVirtual = (folder: Pick<FolderSummaryDTO, "type">) => {
  return folder.type === "VIRTUAL";
};

export const getFolderDetailPath = (folder: Pick<FolderSummaryDTO, "id" | "type">) => {
  if (checkIsFolderTypeVirtual(folder)) {
    return "/my-page/bookmarks/folders/all-places";
  }
  return `/my-page/bookmarks/folders/${folder.id}`;
};
