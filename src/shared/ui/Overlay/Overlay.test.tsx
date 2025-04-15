import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

import Overlay from ".";

test("오버레이 클릭 시 onClose가 호출되어야 한다.", async () => {
  const onClose = vi.fn();
  const { getByTestId } = render(<Overlay onClose={onClose} />);

  const overlay = getByTestId("overlay");
  await userEvent.click(overlay);
  expect(onClose).toHaveBeenCalledTimes(1);
});
