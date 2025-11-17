"use client";

import { createContext, PropsWithChildren, use, useCallback, useState } from "react";

import type { PhotoDTO } from "@/entities/photo/api/photo.interface";

interface SelectedPhotoContextType {
  selectedPhoto: PhotoDTO | null;
  onChangeSelectedPhoto: (photo: PhotoDTO) => void;
}

const SelectedPhotoContext = createContext<SelectedPhotoContextType | undefined>(undefined);

export const SelectedPhotoContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhotoContextType["selectedPhoto"]>(null);

  const onChangeSelectedPhoto: SelectedPhotoContextType["onChangeSelectedPhoto"] = useCallback((photo) => {
    setSelectedPhoto(photo);
  }, []);

  return <SelectedPhotoContext value={{ selectedPhoto, onChangeSelectedPhoto }}>{children}</SelectedPhotoContext>;
};

export const useSelectedPhoto = (): SelectedPhotoContextType => {
  const context = use(SelectedPhotoContext);
  if (!context) {
    throw new Error("useSelectedPhoto must be used within a SelectedPhotoContextProvider");
  }

  return context;
};
