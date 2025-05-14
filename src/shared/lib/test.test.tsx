import { useQuery } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { renderHookWithProviders, renderWithProviders, resolvePromiseComponent } from "./test";

describe("vitest 관련 utils", () => {
  test("비동기 Server Component를 렌더링할 수 있어야 함.", async () => {
    const Component = async () => {
      return <div>Resolved</div>;
    };

    const ComponentResolved = await resolvePromiseComponent(Component, {});
    const { container } = render(<ComponentResolved />);
    const resolved = container.querySelector("div");
    expect(resolved).toBeInTheDocument();
  });

  test("비동기 Server Component가 Props가 존재할 경우 렌더링할 수 있어야 함.", async () => {
    const Component = async ({ name }: { name: string }) => {
      return <div>{name}</div>;
    };

    const ComponentResolved = await resolvePromiseComponent(Component, { name: "Resolved" });
    const { container } = render(<ComponentResolved />);
    const resolved = container.querySelector("div");
    expect(resolved).toHaveTextContent("Resolved");
  });
});

describe("renderHookWithProviders", () => {
  test("useQuery를 호출할 수 있어야 함.", async () => {
    const { result } = renderHookWithProviders(() =>
      useQuery({ queryKey: ["test"], queryFn: () => Promise.resolve({ test: 1 }) }),
    );
    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current.data).toEqual({ test: 1 });
  });
});

describe("renderWithProviders", () => {
  test("renderWithProviders로 감싸진 컴포넌트를 렌더링할 수 있어야 함.", () => {
    const { container } = renderWithProviders(<div>Test</div>);
    const resolved = container.querySelector("div");
    expect(resolved).toHaveTextContent("Test");
  });
});
