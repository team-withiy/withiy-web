import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import Select from ".";

afterEach(() => {
  cleanup();
});

test("Select 컴포넌트가 올바르게 렌더링된다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select isShow={false} size={52} items={[]} isPlaceholder onOpen={onOpen} onClose={onClose}>
      선택하세요
    </Select>,
  );

  expect(screen.getByText("선택하세요")).toBeInTheDocument();
});

test("label이 존재하면 렌더링된다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select isShow={false} size={52} items={[]} isPlaceholder onOpen={onOpen} onClose={onClose} label="레이블 텍스트">
      선택하세요
    </Select>,
  );

  expect(screen.getByTestId("label")).toHaveTextContent("레이블 텍스트");
});

test("errorMessage가 존재하면 렌더링된다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select
      isShow={false}
      size={52}
      items={[]}
      isPlaceholder
      onOpen={onOpen}
      onClose={onClose}
      errorMessage="에러 메시지"
    >
      선택하세요
    </Select>,
  );

  expect(screen.getByTestId("errorMessage")).toHaveTextContent("에러 메시지");
});

test("disabled 상태일 때 버튼이 비활성화된다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select isShow={false} size={52} items={[]} isPlaceholder onOpen={onOpen} onClose={onClose} disabled>
      선택하세요
    </Select>,
  );

  expect(screen.getByTestId("select-button")).toBeDisabled();
});

test("버튼 클릭 시 onOpen이 호출된다.", async () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  const { container } = render(
    <Select isShow={false} size={52} items={[]} isPlaceholder onOpen={onOpen} onClose={onClose}>
      선택하세요
    </Select>,
  );

  // 직접 컨테이너에서 버튼을 찾아서 클릭
  const button = container.querySelector('[data-testid="select-button"]')!;

  await userEvent.click(button);
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("드롭다운이 열린 상태에서 버튼 클릭 시 onClose가 호출된다.", async () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select isShow={true} size={52} items={[]} isPlaceholder onOpen={onOpen} onClose={onClose}>
      선택하세요
    </Select>,
  );

  await userEvent.click(screen.getByTestId("select-button"));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("아이템이 있을 때 메뉴가 렌더링된다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();
  const items = [<div key="item1">항목 1</div>, <div key="item2">항목 2</div>];

  render(
    <Select isShow={true} size={52} items={items} isPlaceholder={true} onOpen={onOpen} onClose={onClose}>
      선택하세요
    </Select>,
  );

  expect(screen.getByTestId("menu")).toBeInTheDocument();
  expect(screen.getByText("항목 1")).toBeInTheDocument();
  expect(screen.getByText("항목 2")).toBeInTheDocument();
});

test("아이템이 없을 때 메뉴가 렌더링되지 않는다.", () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();

  render(
    <Select isShow={true} size={52} items={[]} isPlaceholder={true} onOpen={onOpen} onClose={onClose}>
      선택하세요
    </Select>,
  );

  expect(screen.queryByTestId("menu")).not.toBeInTheDocument();
});

test("onBlur가 제공되면 메뉴가 닫힐 때 호출된다.", async () => {
  const onOpen = vi.fn();
  const onClose = vi.fn();
  const onBlur = vi.fn();

  render(
    <Select
      isShow={true}
      size={52}
      items={[<div key="item">항목</div>]}
      isPlaceholder={false}
      onOpen={onOpen}
      onClose={onClose}
      onBlur={onBlur}
    >
      선택된 항목
    </Select>,
  );

  await userEvent.click(document.body);

  expect(onClose).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});
