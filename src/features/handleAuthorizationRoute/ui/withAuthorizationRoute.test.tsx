import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import withAuthorizationRoute from "./withAuthorizationRoute";

vi.mock("./AuthorizationRouteHandler", () => ({
  __esModule: true,
  default: () => null,
}));

interface TestComponentProps {
  title: string;
  count: number;
  isActive?: boolean;
}

const TestComponent = ({ title, count, isActive = false }: TestComponentProps) => (
  <div>
    <h1>{title}</h1>
    <p>Count: {count}</p>
    <span>Status: {isActive ? "active" : "inactive"}</span>
  </div>
);

test("props를 원본 컴포넌트에 정상적으로 전달한다", () => {
  const WrappedComponent = withAuthorizationRoute(TestComponent, {
    requiredAuth: true,
  });

  const props: TestComponentProps = {
    title: "테스트 제목",
    count: 42,
    isActive: true,
  };

  render(<WrappedComponent {...props} />);

  expect(screen.getByText("테스트 제목")).toBeInTheDocument();
  expect(screen.getByText("Count: 42")).toBeInTheDocument();
  expect(screen.getByText("Status: active")).toBeInTheDocument();
});

test("optional props를 정상적으로 전달한다", () => {
  const WrappedComponent = withAuthorizationRoute(TestComponent, {
    requiredAuth: false,
  });

  const props = {
    title: "선택적 props 테스트",
    count: 10,
  };

  render(<WrappedComponent {...props} />);

  expect(screen.getByText("선택적 props 테스트")).toBeInTheDocument();
  expect(screen.getByText("Count: 10")).toBeInTheDocument();
  expect(screen.getByText("Status: inactive")).toBeInTheDocument();
});

test("빈 props 객체를 정상적으로 처리한다", () => {
  const SimpleComponent = () => <div>Simple Component</div>;

  const WrappedComponent = withAuthorizationRoute(SimpleComponent, {
    requiredCouple: true,
  });

  render(<WrappedComponent />);

  expect(screen.getByText("Simple Component")).toBeInTheDocument();
});

test("익명 컴포넌트를 정상적으로 래핑한다", () => {
  const WrappedComponent = withAuthorizationRoute(() => <div>Anonymous Component</div>, {
    isRestorePage: true,
  });

  render(<WrappedComponent />);

  expect(screen.getByText("Anonymous Component")).toBeInTheDocument();
});
