import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFolderApi } from "@/entities/folder/api/folder.mutations";
import { folderQueries } from "@/entities/folder/api/folder.queries";

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationFn: deleteFolderApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: folderQueries._def });
      replace("/my-page/bookmarks");
    },
  });
};
