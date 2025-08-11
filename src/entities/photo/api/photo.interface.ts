import type { SimpleUserDTO } from "@/entities/user/api/@x/photo";

export interface PhotoDTO {
  imageUrl: string;
  uploader: SimpleUserDTO;
}
