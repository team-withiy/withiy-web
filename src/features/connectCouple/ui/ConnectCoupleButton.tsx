"use client";

import { useTransition } from "react";

import type { CoupleConnectionRequestDTO } from "@/entities/couple/api/couple.interface";

import Button from "@/shared/ui/Button/Button";
import { useToast } from "@/shared/ui/Toast";

import { connectCoupleAction } from "../api/actions";

interface Props extends CoupleConnectionRequestDTO {}

const ConnectCoupleButton: React.FC<Props> = ({ partnerCode }) => {
  const { addToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const errorMessage = await connectCoupleAction({ partnerCode });
      addToast({ message: errorMessage, state: "danger" });
    });
  };

  return (
    <Button size={52} full variant="default" onClick={onClick} disabled={isPending} type="button">
      함께할게요
    </Button>
  );
};

export default ConnectCoupleButton;
