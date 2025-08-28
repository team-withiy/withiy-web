import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFolderApi } from "@/entities/folder/api/folder.mutations";
import { folderQueries } from "@/entities/folder/api/folder.queries";

export const useCreateFolderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFolderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: folderQueries._def });
    },
  });
};
