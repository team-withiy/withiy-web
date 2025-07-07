/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanup } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

import { setFirstMetDateApi } from "@/entities/couple/api/couple.server-mutations";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";
import { FetchHTTPException } from "@/shared/models/auth/fetchHTTPException";

import { setFirstMetDateAction } from "./actions";

vi.mock("@/entities/couple/api/couple.server-mutations", () => ({
  setFirstMetDateApi: vi.fn(),
}));

const mockSetFirstMetDateApi = vi.mocked(setFirstMetDateApi);

const mockPrevState: FormActionState = { status: FormActionStatus.Default };

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("성공적으로 처음 만난 날짜가 설정되면 Success 상태를 반환해야 한다", async () => {
  const formData = new FormData();
  formData.append("firstMetDate", "2024-01-01");

  mockSetFirstMetDateApi.mockResolvedValueOnce({
    success: true,
    data: {},
  } as any);

  const result = await setFirstMetDateAction(mockPrevState, formData);

  expect(mockSetFirstMetDateApi).toHaveBeenCalledWith({
    firstMetDate: "2024-01-01",
  });
  expect(result).toEqual({
    status: FormActionStatus.Success,
  });
});

test("FetchHTTPError가 발생하면 에러 메시지와 함께 Error 상태를 반환해야 한다", async () => {
  const formData = new FormData();
  formData.append("firstMetDate", "2024-01-01");

  const httpError = new FetchHTTPException({
    message: "잘못된 날짜 형식입니다.",
    status: 400,
    timestamp: new Date(),
  });

  mockSetFirstMetDateApi.mockRejectedValueOnce(httpError);

  const result = await setFirstMetDateAction(mockPrevState, formData);

  expect(result).toEqual({
    status: FormActionStatus.Error,
    message: "잘못된 날짜 형식입니다.",
  });
});

test("일반적인 에러가 발생하면 기본 에러 메시지와 함께 Error 상태를 반환해야 한다", async () => {
  const formData = new FormData();
  formData.append("firstMetDate", "2024-01-01");

  const genericError = new Error("Network error");
  mockSetFirstMetDateApi.mockRejectedValueOnce(genericError);

  const result = await setFirstMetDateAction(mockPrevState, formData);

  expect(result).toEqual({
    status: FormActionStatus.Error,
    message: "처음 만난 날짜 설정에 실패했습니다. 다시 시도해주세요.",
  });
});

test("firstMetDate가 누락된 경우에도 API 호출이 이루어져야 한다", async () => {
  const formData = new FormData();

  mockSetFirstMetDateApi.mockResolvedValueOnce({
    success: true,
    data: {},
  } as any);

  const result = await setFirstMetDateAction(mockPrevState, formData);

  expect(mockSetFirstMetDateApi).toHaveBeenCalledWith({
    firstMetDate: null,
  });
  expect(result).toEqual({
    status: FormActionStatus.Success,
  });
});

test("빈 FormData로 호출해도 처리되어야 한다", async () => {
  const formData = new FormData();

  mockSetFirstMetDateApi.mockResolvedValueOnce({
    success: true,
    data: {},
  } as any);

  const result = await setFirstMetDateAction(mockPrevState, formData);

  expect(mockSetFirstMetDateApi).toHaveBeenCalledWith({
    firstMetDate: null,
  });
  expect(result).toEqual({
    status: FormActionStatus.Success,
  });
});

test("다양한 날짜 형식이 올바르게 전달되어야 한다", async () => {
  const testCases = ["2024-12-31", "2023-06-15", "2025-01-01"];

  for (const date of testCases) {
    const formData = new FormData();
    formData.append("firstMetDate", date);

    mockSetFirstMetDateApi.mockResolvedValueOnce({
      success: true,
      data: {},
    } as any);

    const result = await setFirstMetDateAction(mockPrevState, formData);

    expect(mockSetFirstMetDateApi).toHaveBeenCalledWith({
      firstMetDate: date,
    });
    expect(result).toEqual({
      status: FormActionStatus.Success,
    });

    vi.clearAllMocks();
  }
});
