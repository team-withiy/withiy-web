import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import { FOLDER_COLORS } from "@/entities/folder/constants/folder";

import { renderWithProviders } from "@/shared/lib/test";

import Form from "./Form";
import { mockFolders } from "../../../../../__mocks__/folder.handler";

const onClose = vi.fn();
const mutateAsync = vi.fn().mockResolvedValue(() => null);

const testFolderId = mockFolders[0].id;

vi.mock("../../api/updateFolder.mutations", () => {
  return {
    useUpdateFolderMutation: () => ({
      mutateAsync,
    }),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("Form의 구성 요소가 정상적으로 렌더링 되어야 한다.", async () => {
  renderWithProviders(<Form folderId={testFolderId} onClose={onClose} />);

  expect(await screen.findByTestId("update-folder-input")).toBeInTheDocument();
  FOLDER_COLORS.forEach((color) => {
    expect(screen.getByTestId(`update-folder-color-${color}`)).toBeInTheDocument();
  });
  expect(screen.getByTestId("update-folder-submit-button")).toBeInTheDocument();
});

test("validation을 만족하지 않으면 폴더 수정이 불가능해야 한다.", async () => {
  renderWithProviders(<Form folderId={testFolderId} onClose={onClose} />);

  const input = await screen.findByTestId("update-folder-input");
  await userEvent.clear(input);
  await userEvent.click(screen.getByTestId(`update-folder-color-${FOLDER_COLORS[0]}`));
  await userEvent.click(screen.getByTestId("update-folder-submit-button"));
  expect(mutateAsync).not.toBeCalled();
});

test("폴더 수정이 정상적으로 이루어져야한다.", async () => {
  renderWithProviders(<Form folderId={testFolderId} onClose={onClose} />);

  const input = await screen.findByTestId("update-folder-input");
  await userEvent.clear(input);
  await userEvent.type(input, "새 폴더");
  await userEvent.click(screen.getByTestId(`update-folder-color-${FOLDER_COLORS[0]}`));
  await userEvent.click(screen.getByTestId("update-folder-submit-button"));
  expect(mutateAsync).toBeCalledWith({ name: "새 폴더", color: FOLDER_COLORS[0], folderId: testFolderId });
  expect(onClose).toBeCalled();
});
