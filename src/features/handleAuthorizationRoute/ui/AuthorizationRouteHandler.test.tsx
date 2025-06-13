import { redirect } from "next/navigation";

import { beforeEach, describe, expect, test, vi } from "vitest";

import { getMeApi } from "@/entities/user/api/user.server";

import { ErrorDTO } from "@/shared/api/common.interface";
import {
  HOME_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
  REGISTER_PAGE_ENDPOINT,
  RESTORE_PAGE_ENDPOINT,
  SERVER_AUTH_ERROR,
} from "@/shared/constants/auth";
import { resolvePromiseComponent } from "@/shared/lib/test";

import AuthorizationRouteHandler from "./AuthorizationRouteHandler";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/entities/user/api/user.server", () => ({
  getMeApi: vi.fn(),
}));

describe("로그인이 필요한 페이지", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("로그인을 하지 않은 경우", () => {
    test("로그인 페이지로 redirect", async () => {
      vi.mocked<() => Promise<ErrorDTO>>(getMeApi).mockResolvedValue(SERVER_AUTH_ERROR);

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredAuth: true,
      });
      expect(redirect).toHaveBeenCalledWith(LOGIN_PAGE_ENDPOINT);
    });
  });

  describe("계정 복구가 가능한 경우", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    test("복구 페이지로 redirect", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: true,
          code: "test-code",
          isRegistered: true,
          hasCouple: false,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredAuth: true,
      });

      expect(redirect).toHaveBeenCalledWith(RESTORE_PAGE_ENDPOINT);
    });
  });

  describe("회원가입을 진행하지 않은 경우", () => {
    test("회원가입 페이지로 redirect", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: false,
          code: "test-code",
          isRegistered: false,
          hasCouple: false,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredAuth: true,
      });

      expect(redirect).toHaveBeenCalledWith(REGISTER_PAGE_ENDPOINT);
    });
  });
});

describe("로그인이 하지 않아야 접근 가능한 페이지", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("로그인을 한 경우", () => {
    test("홈 페이지로 redirect", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: false,
          code: "test-code",
          isRegistered: true,
          hasCouple: false,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredAuth: false,
      });

      expect(redirect).toHaveBeenCalledWith(HOME_PAGE_ENDPOINT);
    });
  });

  describe("로그인을 하지 않은 경우", () => {
    test("redirect가 호출되지 않음", async () => {
      vi.mocked<() => Promise<ErrorDTO>>(getMeApi).mockResolvedValue(SERVER_AUTH_ERROR);

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredAuth: false,
      });

      expect(redirect).not.toHaveBeenCalled();
    });
  });
});

describe("커플만 접근 가능한 페이지", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("커플인 경우", () => {
    test("redirect가 일어나지 않음", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: false,
          code: "test-code",
          isRegistered: true,
          hasCouple: true,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredCouple: true,
        requiredAuth: true,
      });

      expect(redirect).not.toHaveBeenCalled();
    });
  });

  describe("커플이 아닌 경우", () => {
    test("홈 페이지로 redirect", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: false,
          code: "test-code",
          isRegistered: true,
          hasCouple: false,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredCouple: true,
        requiredAuth: true,
      });

      expect(redirect).toHaveBeenCalledWith(HOME_PAGE_ENDPOINT);
    });
  });

  describe("로그인이 되지 않은 경우", () => {
    test("로그인 페이지로 redirect", async () => {
      vi.mocked<() => Promise<ErrorDTO>>(getMeApi).mockResolvedValue(SERVER_AUTH_ERROR);

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredCouple: true,
        requiredAuth: true,
      });

      expect(redirect).toHaveBeenCalledWith(LOGIN_PAGE_ENDPOINT);
    });
  });
});

describe("커플이지 않은 경우만 접근 가능한 페이지", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("커플이 아닌 경우", () => {
    test("redirect가 일어나지 않음", async () => {
      vi.mocked(getMeApi).mockResolvedValue({
        data: {
          nickname: "testUser",
          thumbnail: "test-thumbnail.jpg",
          restoreEnabled: false,
          code: "test-code",
          isRegistered: true,
          hasCouple: false,
        },
        status: 200,
        message: "",
        timestamp: new Date(),
      });

      await resolvePromiseComponent(AuthorizationRouteHandler, {
        requiredCouple: false,
        requiredAuth: true,
      });

      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
