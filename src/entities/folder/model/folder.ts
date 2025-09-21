import { SAVED_ALL_PLACES_FOLDER_ID } from "../constants/folder";

export const getFolderDetailPath = (folderId: number) => {
  if (folderId === SAVED_ALL_PLACES_FOLDER_ID) {
    return "/my-page/bookmarks/folders/all-places";
  }

  return `/my-page/bookmarks/folders/${folderId}`;
};
