import { useMutation } from "@tanstack/react-query";

import { createReportApi } from "@/entities/report/api/report.mutations";

export const useCreatePlaceReportMutation = () => {
  return useMutation({
    mutationFn: createReportApi,
    onSuccess: () => {
      // FIX : 신고 성공 후 행동 정의가 안되어 있음.
      console.log("신고 성공");
    },
    onError: (error) => {
      // FIX : 신고 실패 후 처리
      console.error(error);
    },
  });
};
