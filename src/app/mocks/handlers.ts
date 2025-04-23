import { authHandlers } from "__mocks__/auth.handler";
import { categoryHandlers } from "__mocks__/category.handler";

export const handlers = [...categoryHandlers, ...authHandlers];
