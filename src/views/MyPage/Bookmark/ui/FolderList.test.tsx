import { useQuery } from "@tanstack/react-query";
import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routerMock from "next-router-mock";
import { afterEach, expect, test } from "vitest";

import { folderQueries } from "@/entities/folder/api/folder.queries";
import { getFolderDetailPath } from "@/entities/folder/model/folder";

import { renderHookWithProviders, renderWithProviders } from "@/shared/lib/test";

import FolderList from "./FolderList";

afterEach(() => {
  cleanup();
  routerMock.setCurrentUrl("/my-page/bookmarks");
});

test("Folder들이 정상적으로 렌더링된다.", async () => {
  renderWithProviders(<FolderList />);

  await waitFor(() => expect(screen.getByTestId("folder-list")).toBeInTheDocument());
  expect(screen.getByTestId("folder-list")).toMatchSnapshot();
});

test("Folder를 클릭하면 해당 Folder로 이동한다.", async () => {
  renderWithProviders(<FolderList />);
  const { result } = renderHookWithProviders(() => useQuery(folderQueries.getFolders));
  await waitFor(() => expect(result.current.data).toBeDefined());

  expect(routerMock.asPath).toBe("/my-page/bookmarks");

  const firstFolder = result.current.data!.data[0];
  await userEvent.click(screen.getByTestId(`folder-link-${firstFolder.id}`));
  expect(routerMock.asPath).toBe(getFolderDetailPath(firstFolder));
});
