import { composeStories } from "@storybook/react";
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import * as stories from "./Button.stories";

const { Default } = composeStories(stories);

describe("Button", () => {
  test("should render the button", async () => {
    await Default.run();
    expect(screen.getByTestId("this-is-button")).toBeInTheDocument();
  });
});
