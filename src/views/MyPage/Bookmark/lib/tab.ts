export const enum BookmarkTab {
  PLACES = "places",
  COURSES = "courses",
}

export const isPlaceActive = (tab: unknown): tab is BookmarkTab.PLACES => {
  return tab === BookmarkTab.PLACES;
};

export const isCourseActive = (tab: unknown): tab is BookmarkTab.COURSES => {
  return tab === BookmarkTab.COURSES;
};
