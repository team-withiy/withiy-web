import type { Accept } from "react-dropzone";

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

export const IMAGE_ACCEPT: Accept = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/x-icon": [".ico"],
  "image/bmp": [".bmp"],
  "image/tiff": [".tif"],
};

export const DEFAULT_PROFILE_IMAGE_SRC = "/images/default-profile.png";
