import { useState } from "react";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";

import Accordion from ".";

afterEach(() => {
  cleanup();
});

const MockAccordion = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      isShow={isShow}
      summary={<div>SUMMARY CONTENTS</div>}
      details={<div>DETAIL CONTENTS</div>}
      onClickButton={() => setIsShow((prev) => !prev)}
    />
  );
};

test("열고 닫힘이 가능해야한다.", async () => {
  render(<MockAccordion />);

  expect(screen.queryByTestId("accordion-details")).not.toBeInTheDocument();
  const button = screen.getByTestId("accordion-button");
  await userEvent.click(button);

  expect(screen.getByTestId("accordion-details")).toBeInTheDocument();

  await userEvent.click(button);
  await waitFor(() => expect(screen.queryByTestId("accordion-details")).not.toBeInTheDocument());
});
