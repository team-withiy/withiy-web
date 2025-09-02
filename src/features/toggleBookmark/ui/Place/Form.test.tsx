import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import Form from "./Form";
import { mockFolderOptions } from "__mocks__/folder.handler";

const onClose = vi.fn();
const mutate = vi.fn().mockResolvedValue(() => null);

vi.mock("../../api/place.mutations", () => ({
  useUpdatePlaceBookmarkMutation: () => ({
    mutate,
  }),
}));

afterEach(() => {
  cleanup();
});

test("폴더가 정상적으로 렌더링되어야한다.", async () => {
  renderWithProviders(<Form placeId={1} onClose={onClose} />);
  await waitFor(() => expect(screen.getByTestId("place-bookmark-submit-button")).toBeInTheDocument());
  mockFolderOptions.forEach((folder) => {
    expect(screen.getByTestId(`folder-${folder.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`folder-${folder.id}-name`)).toHaveTextContent(folder.name);
    expect(screen.getByTestId(`folder-${folder.id}-count`)).toHaveTextContent(folder.bookmarkCount.toString());
  });
});

test("북마크가 정상적으로 업데이트되어야 한다.", async () => {
  renderWithProviders(<Form placeId={1} onClose={onClose} />);
  await waitFor(() => expect(screen.getByTestId("place-bookmark-submit-button")).toBeInTheDocument());

  const tests = mockFolderOptions.map(async (folder) => {
    const checkbox = screen.getByTestId(`folder-${folder.id}-checkbox`);
    const count = screen.getByTestId(`folder-${folder.id}-count`);
    await userEvent.click(checkbox);

    if (folder.bookmarked) {
      expect(checkbox).not.toBeChecked();
      expect(count).toHaveTextContent((folder.bookmarkCount - 1).toString());
    } else {
      expect(checkbox).toBeChecked();
      expect(count).toHaveTextContent((folder.bookmarkCount + 1).toString());
    }

    if (!folder.bookmarked) return folder.id;
  });

  const resolvedTests = (await Promise.all(tests)).filter(Boolean);

  await userEvent.click(screen.getByTestId("place-bookmark-submit-button"));
  expect(mutate).toHaveBeenCalledWith(expect.objectContaining({ folderIds: resolvedTests }));
});
