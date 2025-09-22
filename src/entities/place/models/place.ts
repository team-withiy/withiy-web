import type { PlaceDetailDTO, PlaceSummaryDTO } from "../api/place.interface";

export const convertPlaceDetailToSummary = (place: PlaceDetailDTO): PlaceSummaryDTO => {
  return {
    placeId: place.placeId,
    placeName: place.placeName,
    address: place.address,
    score: place.score,
    category: place.category,
    imageUrls: place.photos.map((photo) => photo.imageUrl),
  };
};
