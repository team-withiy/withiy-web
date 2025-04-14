"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { range } from "lodash-es";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Select from "@/shared/ui/Select/Select";
import SelectItem from "@/shared/ui/Select/SelectItem";

const schema = z.object({
  value: z.number().min(0, { message: "아이템을 선택하세요." }),
});

type Schema = z.infer<typeof schema>;

const Test: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      value: -1,
    },
  });

  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name="value"
        render={({ field: { value, onBlur, onChange } }) => {
          const onClickItem = (i: number) => {
            onChange(i);
            setIsShow(false);
          };

          return (
            <Select
              isShow={isShow}
              onOpen={() => setIsShow(true)}
              onClose={() => setIsShow(false)}
              onBlur={onBlur}
              size={52}
              errorMessage={errors.value?.message}
              isPlaceholder={value === -1}
              items={range(10).map((i) => (
                <SelectItem key={i} onClick={() => onClickItem(i)} isSelected={value === i}>
                  ITEM {i}
                </SelectItem>
              ))}
            >
              {value === -1 ? "선택하세요" : `ITEM ${value}`}
            </Select>
          );
        }}
      />
    </>
  );
};

export default Test;
