import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { mockConsole } from "vitest-console";

import { IconHeart16 } from "public/icons";

import IconButton from ".";

test("type을 명시하지 않으면 console.assert가 발생한다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<IconButton icon={<IconHeart16 />} variant="outline" />);
  expect(console.assert).toHaveBeenCalledWith(false, "IconButton type is required");
  restoreConsole();
});

test("type을 명시하면 console.assert가 발생하지 않는다.", () => {
  const { restoreConsole } = mockConsole(["assert"]);
  render(<IconButton type="button" variant="outline" icon={<IconHeart16 />} />);
  expect(console.assert).toHaveBeenCalledWith(true, "IconButton type is required");
  restoreConsole();
});
