export interface UploadImageDTO {
  entityType: string;
  entityId?: string;
  file: File;
}

export interface ImageResponseDTO {
  imageUrl: string;
  entityType: string;
  entityId: number | null;
}
