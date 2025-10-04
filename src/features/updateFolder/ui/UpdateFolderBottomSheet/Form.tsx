"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { folderQueries } from "@/entities/folder/api/folder.queries";
import { FOLDER_COLORS } from "@/entities/folder/constants/folder";

import Button from "@/shared/ui/Button/Button";
import UnderlineInput from "@/shared/ui/Input/UnderlineInput";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { useUpdateFolderMutation } from "../../api/updateFolder.mutations";

import styles from "./Form.module.scss";

const schema = z.object({
  name: z.string().min(1, "폴더 이름을 입력해주세요").max(12, "폴더 이름은 최대 12자까지 가능합니다."),
  color: z.string(),
});

type Schema = z.infer<typeof schema>;

interface Props {
  folderId: number;
  onClose: () => void;
}

const Form: React.FC<Props> = ({ folderId, onClose }) => {
  const { data: folders } = useSuspenseQuery(folderQueries.getFolders);
  const folder = folders.data.find((folder) => folder.id === Number(folderId));
  const { mutateAsync } = useUpdateFolderMutation();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<Schema>({
    defaultValues: {
      name: folder?.name,
      color: folder?.color || FOLDER_COLORS[0],
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await mutateAsync({ ...data, folderId });
    onClose();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)} data-testid="update-folder-form">
      <div className={styles.content}>
        <UnderlineInput
          className={styles.input}
          label="폴더 이름 (최대 12자)"
          placeholder="폴더명을 작성해주세요."
          type="text"
          inputMode="text"
          errorMessage={errors.name?.message}
          {...register("name")}
          data-testid="update-folder-input"
        />
        <fieldset className={styles.colors}>
          <legend className={styles.legend}>폴더 색상</legend>
          <div className={styles.colorOptions}>
            {FOLDER_COLORS.map((color) => (
              <label key={color} className={styles.colorOption}>
                <input
                  type="radio"
                  value={color}
                  {...register("color")}
                  hidden
                  data-testid={`update-folder-color-${color}`}
                />
                <div className={styles.colorIndicator} style={{ backgroundColor: color }} />
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          type="submit"
          size={52}
          variant="default"
          full
          disabled={!isValid || isSubmitting}
          data-testid="update-folder-submit-button"
        >
          폴더 수정하기
        </Button>
      </div>
    </form>
  );
};

export default SSRSafeSuspense.with(Form, {
  fallback: null,
});
