import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFolderApi } from "@/entities/folder/api/folder.mutations";
import { folderQueries } from "@/entities/folder/api/folder.queries";

export const useUpdateFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: folderQueries._def });
    },
  });
};
