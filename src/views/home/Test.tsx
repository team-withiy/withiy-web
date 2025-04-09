"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Input from "@/shared/ui/Input/Input";

const schema = z.object({
  value: z.string().min(3, { message: "3글자 이상 입력하세요." }),
});

type Schema = z.infer<typeof schema>;

const Test: React.FC = () => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useForm<Schema>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  return (
    <Input
      type="text"
      errorMessage={errors.value?.message}
      successMessage={!!touchedFields.value && !errors.value && "성공"}
      size={52}
      {...register("value")}
    />
  );
};

export default Test;
