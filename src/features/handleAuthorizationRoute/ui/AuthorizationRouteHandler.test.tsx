// import { redirect } from "next/navigation";

// import { beforeEach, describe, expect, test, vi } from "vitest";
import { test } from "vitest";

// import { getMeApi } from "@/entities/user/api/user.server";

// import { ErrorDTO } from "@/shared/api/common.interface";
// import { LOGIN_PAGE_ENDPOINT, RESTORE_PAGE_ENDPOINT, SERVER_AUTH_ERROR } from "@/shared/constants/auth";
// import { resolvePromiseComponent } from "@/shared/lib/test";

// import AuthorizationRouteHandler from "./AuthorizationRouteHandler";

// vi.mock("next/navigation", () => ({
//   redirect: vi.fn(),
// }));

// vi.mock("@/entities/user/api/user.server", () => ({
//   getMeApi: vi.fn(),
// }));

test("");

// describe("로그인이 필요한 페이지", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   describe("로그인을 하지 않은 경우", () => {
//     test("로그인 페이지로 redirect", async () => {
//       vi.mocked<() => Promise<ErrorDTO>>(getMeApi).mockResolvedValue(SERVER_AUTH_ERROR);

//       await resolvePromiseComponent(AuthorizationRouteHandler, {
//         requiredAuth: true,
//         children: <div>Protected Content</div>,
//       });
//       expect(redirect).toHaveBeenCalledWith(LOGIN_PAGE_ENDPOINT);
//     });
//   });

//   describe("계정 복구가 가능한 경우", () => {
//     test("복구 페이지로 redirect", async () => {
//       vi.mocked(getMeApi).mockResolvedValue({
//         data: {
//           nickname: "testUser",
//           thumbnail: "test-thumbnail.jpg",
//           restoreEnabled: true,
//         },
//         status: 200,
//         message: "",
//         timestamp: new Date(),
//       });

//       await resolvePromiseComponent(AuthorizationRouteHandler, {
//         requiredAuth: true,
//         children: <div>Protected Content</div>,
//       });

//       expect(redirect).toHaveBeenCalledWith(RESTORE_PAGE_ENDPOINT);
//     });
//   });

//   describe("회원가입을 진행하지 않은 경우", () => {
//     test("정상적으로 자식 컴포넌트를 렌더링", async () => {
//       // getMeApi가 일반 로그인 상태를 반환하도록 모킹
//       vi.mocked(getMeApi).mockResolvedValue({
//         data: {
//           nickname: "testUser",
//           thumbnail: "test-thumbnail.jpg",
//           restoreEnabled: false,
//         },
//         status: 200,
//         message: "",
//         timestamp: new Date(),
//       });

//       const result = await render(
//         <AuthorizationRouteHandler requiredAuth={true}>
//           <div data-testid="protected-content">Protected Content</div>
//         </AuthorizationRouteHandler>,
//       );

//       // redirect가 호출되지 않았는지 확인
//       expect(redirect).not.toHaveBeenCalled();
//     });
//   });
// });

// describe("로그인이 필요하지 않은 페이지", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   describe("로그인을 한 경우", () => {
//     test("홈 페이지로 redirect", async () => {
//       // getMeApi가 로그인된 상태를 반환하도록 모킹
//       vi.mocked(getMeApi).mockResolvedValue({
//         data: {
//           nickname: "testUser",
//           thumbnail: "test-thumbnail.jpg",
//           restoreEnabled: false,
//         },
//         status: 200,
//       });

//       await render(
//         <AuthorizationRouteHandler requiredAuth={false}>
//           <div>Public Content</div>
//         </AuthorizationRouteHandler>,
//       );

//       // redirect가 HOME_PAGE_ENDPOINT로 호출되었는지 확인
//       expect(redirect).toHaveBeenCalledWith(HOME_PAGE_ENDPOINT);
//     });
//   });

//   describe("로그인을 하지 않은 경우", () => {
//     test("정상적으로 자식 컴포넌트를 렌더링", async () => {
//       // getMeApi가 로그인하지 않은 상태를 반환하도록 모킹
//       vi.mocked(getMeApi).mockResolvedValue({
//         data: null,
//         status: UNAUTHORIZED_STATUS,
//       });

//       const result = await render(
//         <AuthorizationRouteHandler requiredAuth={false}>
//           <div data-testid="public-content">Public Content</div>
//         </AuthorizationRouteHandler>,
//       );

//       // redirect가 호출되지 않았는지 확인
//       expect(redirect).not.toHaveBeenCalled();
//     });
//   });
// });
