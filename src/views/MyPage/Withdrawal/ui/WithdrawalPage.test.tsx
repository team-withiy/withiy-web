import { screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

import { renderWithProviders } from "@/shared/lib/test";

import WithdrawalPage from ".";

test("정상적으로 렌더링되어야 한다.", async () => {
  renderWithProviders(<WithdrawalPage />);

  await waitFor(() => {
    expect(screen.getByTestId("withdrawal-page")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent("회원탈퇴");
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });
});
