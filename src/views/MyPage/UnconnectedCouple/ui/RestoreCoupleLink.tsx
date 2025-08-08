"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { userQueries } from "@/entities/user/api/user.queries";
import { hasUserRestorableCouple } from "@/entities/user/models/hasCouple";

import ChevronLink from "@/shared/ui/ChevronLink";
import SSRSafeSuspense from "@/shared/ui/Suspense/SSRSafeSuspense";

const RestoreCoupleLink: React.FC = () => {
  const me = useSuspenseQuery(userQueries.getMe).data.data;
  if (!hasUserRestorableCouple(me)) return null;

  return <ChevronLink href="/my-page/couples/unconnected/restore">커플 정보 복구하기</ChevronLink>;
};

export default SSRSafeSuspense.with(RestoreCoupleLink, {});
