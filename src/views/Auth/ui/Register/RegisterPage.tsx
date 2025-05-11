import { AuthorizationRouteHandler } from "@/features/handleAuthorizationRoute/ui";

import { getTermsApi } from "@/entities/term/api/term.server";

import RegisterFunnelPage from "./RegisterFunnelPage";

const RegisterPage: React.FC = () => {
  const termPromise = getTermsApi();

  return (
    <>
      <RegisterFunnelPage termPromise={termPromise} />;
      <AuthorizationRouteHandler requiredAuth isRegisterPage />
    </>
  );
};

export default RegisterPage;
