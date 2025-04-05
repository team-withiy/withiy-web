import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { mockConsole } from "vitest-console";

import UnderlineButton from "./UnderlineButton";

test("type을 명시하지 않으면 console.assert가 발생한다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineButton size={24} />);
  expect(console.assert).toHaveBeenCalledWith(false, "Button type is required");
  restoreConsole();
});

test("type을 명시하면 console.assert가 발생하지 않는다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<UnderlineButton type="button" size={24} />);
  expect(console.assert).toHaveBeenCalledWith(true, "Button type is required");
  restoreConsole();
});
