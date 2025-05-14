import { describe, expect, test, vi } from "vitest";

import { ErrorDTO } from "@/shared/api/common.interface";

import { FetchHTTPException, getFetchHTTPError, isFetchHTTPError } from "./fetchHTTPException";

describe("FetchHTTPException", () => {
  describe("FetchHTTPException 클래스", () => {
    test("생성자가 ErrorDTO의 속성을 올바르게 설정해야 함", () => {
      const errorDTO: ErrorDTO = {
        status: 404,
        message: "리소스를 찾을 수 없습니다.",
        timestamp: new Date(),
      };

      const error = new FetchHTTPException(errorDTO);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(FetchHTTPException);
      expect(error.status).toBe(errorDTO.status);
      expect(error.message).toBe(errorDTO.message);
      expect(error.timestamp).toBe(errorDTO.timestamp);
    });
  });

  describe("isFetchHTTPError 함수", () => {
    test("FetchHTTPException 인스턴스를 true로 식별해야 함", () => {
      const errorDTO: ErrorDTO = {
        status: 500,
        message: "서버 오류가 발생했습니다.",
        timestamp: new Date(),
      };
      const error = new FetchHTTPException(errorDTO);

      expect(isFetchHTTPError(error)).toBe(true);
    });

    test("다른 에러 타입은 false로 식별해야 함", () => {
      const error = new Error("일반 에러");
      expect(isFetchHTTPError(error)).toBe(false);

      expect(isFetchHTTPError(null)).toBe(false);
      expect(isFetchHTTPError(undefined)).toBe(false);
      expect(isFetchHTTPError({ message: "객체" })).toBe(false);
    });
  });

  describe("getFetchHTTPError 함수", () => {
    test("Response.json()을 호출하여 ErrorDTO를 반환해야 함", async () => {
      const mockErrorDTO: ErrorDTO = {
        status: 400,
        message: "잘못된 요청입니다.",
        timestamp: new Date(),
      };

      const mockResponse = {
        json: vi.fn().mockResolvedValue(mockErrorDTO),
      };

      const result = await getFetchHTTPError(mockResponse as unknown as Response);

      expect(mockResponse.json).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockErrorDTO);
    });
  });
});
