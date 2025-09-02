import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import { FOLDER_COLORS } from "@/entities/folder/constants/folder";

import Form from "./Form";

const onClose = vi.fn();
const mutateAsync = vi.fn().mockResolvedValue(() => null);

vi.mock("../api/createFolder.mutations", () => {
  return {
    useCreateFolderMutation: () => ({
      mutateAsync,
    }),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("Form의 구성 요소가 정상적으로 렌더링 되어야 한다.", () => {
  render(<Form onClose={onClose} />);
  expect(screen.getByTestId("create-folder-input")).toBeInTheDocument();
  FOLDER_COLORS.forEach((color) => {
    expect(screen.getByTestId(`create-folder-color-${color}`)).toBeInTheDocument();
  });
  expect(screen.getByTestId("create-folder-submit-button")).toBeInTheDocument();
});

test("validation을 만족하지 않으면 폴더 생성이 불가능해야 한다.", async () => {
  render(<Form onClose={onClose} />);
  await userEvent.click(screen.getByTestId(`create-folder-color-${FOLDER_COLORS[0]}`));
  await userEvent.click(screen.getByTestId("create-folder-submit-button"));
  expect(mutateAsync).not.toBeCalled();
});

test("폴더 생성이 정상적으로 이루어져야한다.", async () => {
  render(<Form onClose={onClose} />);
  await userEvent.click(screen.getByTestId(`create-folder-color-${FOLDER_COLORS[0]}`));
  await userEvent.type(screen.getByTestId("create-folder-input"), "새 폴더");
  await userEvent.click(screen.getByTestId("create-folder-submit-button"));
  expect(mutateAsync).toBeCalledWith({ name: "새 폴더", color: FOLDER_COLORS[0] });
  expect(onClose).toBeCalled();
});
