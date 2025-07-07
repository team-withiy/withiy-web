import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getTermsApi } from "@/entities/term/api/term.server";
import { getMeApi } from "@/entities/user/api/user.server";

import RegisterFunnelPage from "./RegisterFunnelPage";

const RegisterPage: React.FC = () => {
  const termPromise = getTermsApi();
  const mePromise = getMeApi();

  return <RegisterFunnelPage termPromise={termPromise} mePromise={mePromise} />;
};

export default withAuthorizationRoute(RegisterPage, { requiredAuth: true, isRegisterPage: true });
