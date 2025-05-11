import { authHandlers } from "__mocks__/auth.handler";
import { categoryHandlers } from "__mocks__/category.handler";
import { termHandlers } from "__mocks__/term.handler";

export const handlers = [...categoryHandlers, ...authHandlers, ...termHandlers];
