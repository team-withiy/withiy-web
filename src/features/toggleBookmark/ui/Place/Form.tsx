"use client";

import { useCallback, useEffect } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

import { FolderOptionDTO } from "@/entities/folder/api/folder.interface";
import { folderQueries } from "@/entities/folder/api/folder.queries";

import Button from "@/shared/ui/Button/Button";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

import { useUpdatePlaceBookmarkMutation } from "../../api/place.mutations";
import { IconHeart24 } from "public/icons";

import styles from "./Form.module.scss";

interface Props {
  placeId: number;
  onClose: () => void;
}

interface FormValues {
  [id: string]: Pick<FolderOptionDTO, "bookmarked" | "bookmarkCount">;
}

const Form: React.FC<Props> = ({ placeId, onClose }) => {
  const { data } = useSuspenseQuery(folderQueries.getPlaceFolders(placeId));
  const { mutate } = useUpdatePlaceBookmarkMutation();

  const getFormValues = useCallback((folders: FolderOptionDTO[]) => {
    return folders.reduce<FormValues>((acc, folder) => {
      acc[folder.id] = {
        bookmarked: folder.bookmarked,
        bookmarkCount: folder.bookmarkCount,
      };
      return acc;
    }, {});
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: getFormValues(data.data),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isDirty) {
      const folderIds = Object.entries(data).reduce<number[]>((acc, [id, { bookmarked }]) => {
        if (bookmarked) acc.push(Number(id));
        return acc;
      }, []);

      mutate({ placeId, folderIds });
    }
    onClose();
  };

  useEffect(() => {
    reset(getFormValues(data.data));
  }, [data, getFormValues, reset]);

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        {data.data.map((folder) => (
          <Controller
            key={folder.id}
            control={control}
            name={folder.id.toString()}
            render={({ field }) => {
              const fieldValue = field.value ?? {
                bookmarked: folder.bookmarked,
                bookmarkCount: folder.bookmarkCount,
              };

              return (
                <li className={styles.item} key={folder.id} data-testid={`folder-${folder.id}`}>
                  <div className={styles.info}>
                    <div className={styles.color} style={{ backgroundColor: folder.color }} />
                    <span className={styles.name} data-testid={`folder-${folder.id}-name`}>
                      {folder.name}
                    </span>
                    <span className={styles.count} data-testid={`folder-${folder.id}-count`}>
                      {fieldValue.bookmarkCount}
                    </span>
                  </div>
                  <label className={styles.bookmarkButton}>
                    <IconHeart24 className={styles.icon} />
                    <input
                      type="checkbox"
                      hidden
                      data-testid={`folder-${folder.id}-checkbox`}
                      checked={fieldValue.bookmarked}
                      onChange={() =>
                        field.onChange({
                          bookmarked: !fieldValue.bookmarked,
                          bookmarkCount: fieldValue.bookmarkCount + (fieldValue.bookmarked ? -1 : 1),
                        })
                      }
                    />
                  </label>
                </li>
              );
            }}
          />
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <Button
          type="submit"
          size={52}
          variant="default"
          full
          disabled={isSubmitting}
          data-testid="place-bookmark-submit-button"
        >
          장소 저장하기
        </Button>
      </div>
    </form>
  );
};

const LoadingForm: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <Skeleton className={styles.item} />
        <Skeleton className={styles.item} />
        <Skeleton className={styles.item} />
      </div>
    </div>
  );
};

export default SSRSafeSuspense.with(Form, {
  fallback: <LoadingForm />,
});
