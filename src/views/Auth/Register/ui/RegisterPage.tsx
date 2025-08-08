import { withAuthorizationRoute } from "@/features/handleAuthorizationRoute/ui";

import { getTermsApi } from "@/entities/term/api/term.server";

import RegisterFunnelPage from "./RegisterFunnelPage";

const RegisterPage: React.FC = () => {
  const termPromise = getTermsApi();

  return <RegisterFunnelPage termPromise={termPromise} />;
};

export default withAuthorizationRoute(RegisterPage, { requiredAuth: true, isRegisterPage: true });
