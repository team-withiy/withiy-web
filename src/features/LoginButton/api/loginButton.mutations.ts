import { useMutation } from "@tanstack/react-query";

import { setRecentLoginedSocialTypeApi } from "@/shared/api/auth/auth.mutations";

export const useSetRecentLoginedSocialTypeMutation = () =>
  useMutation({
    mutationFn: setRecentLoginedSocialTypeApi,
    onSuccess: (data) => {
      window.open(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${data.socialType}`, "_self");
    },
  });
