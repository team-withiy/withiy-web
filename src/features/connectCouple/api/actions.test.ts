/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanup } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { connectCoupleApi } from "@/entities/couple/api/couple.server-mutations";

import { FormActionState, FormActionStatus } from "@/shared/api/common.interface";

import { connectCoupleAction } from "./actions";

vi.mock("@/entities/couple/api/couple.server-mutations", () => ({
  connectCoupleApi: vi.fn(),
}));

const mockConnectCoupleApi = vi.mocked(connectCoupleApi);

describe("connectCoupleAction", () => {
  const mockPrevState: FormActionState = { status: FormActionStatus.Default };

  beforeEach(() => {
    cleanup();
  });

  test("성공적으로 커플 연결이 완료되면 Success 상태를 반환해야 한다", async () => {
    const formData = new FormData();
    formData.append("partnerCode", "test-partner-code");
    formData.append("firstMetDate", "2024-01-01");

    mockConnectCoupleApi.mockResolvedValueOnce({
      success: true,
      data: {},
    } as any);

    const result = await connectCoupleAction(mockPrevState, formData);

    expect(mockConnectCoupleApi).toHaveBeenCalledWith({
      partnerCode: "test-partner-code",
      firstMetDate: "2024-01-01",
    });
    expect(result).toEqual({
      status: FormActionStatus.Success,
    });
  });

  test("firstMetDate가 없는 경우에도 정상적으로 처리되어야 한다", async () => {
    const formData = new FormData();
    formData.append("partnerCode", "test-partner-code");

    mockConnectCoupleApi.mockResolvedValueOnce({
      success: true,
      data: {},
    } as any);

    const result = await connectCoupleAction(mockPrevState, formData);

    expect(mockConnectCoupleApi).toHaveBeenCalledWith({
      partnerCode: "test-partner-code",
      firstMetDate: null,
    });
    expect(result).toEqual({
      status: FormActionStatus.Success,
    });
  });

  test("일반적인 에러가 발생하면 기본 에러 메시지와 함께 Error 상태를 반환해야 한다", async () => {
    const formData = new FormData();
    formData.append("partnerCode", "test-partner-code");
    formData.append("firstMetDate", "2024-01-01");

    const genericError = new Error("Network error");
    mockConnectCoupleApi.mockRejectedValueOnce(genericError);

    const result = await connectCoupleAction(mockPrevState, formData);

    expect(result).toEqual({
      status: FormActionStatus.Error,
      message: "커플 연결에 실패했습니다. 다시 시도해주세요.",
    });
  });

  test("partnerCode가 누락된 경우에도 API 호출이 이루어져야 한다", async () => {
    const formData = new FormData();
    formData.append("firstMetDate", "2024-01-01");

    mockConnectCoupleApi.mockResolvedValueOnce({
      success: true,
      data: {},
    } as any);

    const result = await connectCoupleAction(mockPrevState, formData);

    expect(mockConnectCoupleApi).toHaveBeenCalledWith({
      partnerCode: null,
      firstMetDate: "2024-01-01",
    });
    expect(result).toEqual({
      status: FormActionStatus.Success,
    });
  });

  test("빈 FormData로 호출해도 처리되어야 한다", async () => {
    const formData = new FormData();

    mockConnectCoupleApi.mockResolvedValueOnce({
      success: true,
      data: {},
    } as any);

    const result = await connectCoupleAction(mockPrevState, formData);

    expect(mockConnectCoupleApi).toHaveBeenCalledWith({
      partnerCode: null,
      firstMetDate: null,
    });
    expect(result).toEqual({
      status: FormActionStatus.Success,
    });
  });
});
