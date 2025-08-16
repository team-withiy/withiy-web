import type { SimpleUserDTO } from "@/entities/user/api/@x/photo";

export interface PhotoDTO {
  photoId: number;
  imageUrl: string;
  uploader: SimpleUserDTO;
}
