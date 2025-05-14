import { authHandlers } from "__mocks__/auth.handler";
import { categoryHandlers } from "__mocks__/category.handler";
import { termHandlers } from "__mocks__/term.handler";
import { userHandlers } from "__mocks__/user.handler";

export const handlers = [...categoryHandlers, ...authHandlers, ...termHandlers, ...userHandlers];
