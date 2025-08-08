import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { logoutApi as logoutServerApi } from "@/entities/user/api/user.server-mutations";

import { logoutApi as logoutFrontApi } from "@/shared/api/auth/auth.mutations";
import { clearTokenCache } from "@/shared/api/auth/authApiClient";

const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    await logoutServerApi();
    await logoutFrontApi();
    queryClient.clear();
    clearTokenCache();
  }, [queryClient]);

  return { logout };
};

export default useLogout;
