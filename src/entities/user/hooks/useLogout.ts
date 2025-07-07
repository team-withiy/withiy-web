import { useCallback } from "react";

import { logoutApi as logoutServerApi } from "@/entities/user/api/user.server-mutations";

import { logoutApi as logoutFrontApi } from "@/shared/api/auth/auth.mutations";

const useLogout = () => {
  const logout = useCallback(async () => {
    await logoutServerApi();
    await logoutFrontApi();
  }, []);

  return { logout };
};

export default useLogout;
