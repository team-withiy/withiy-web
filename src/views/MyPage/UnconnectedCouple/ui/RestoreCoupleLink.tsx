import type { UserDTO } from "@/entities/user/api/user.interface";
import { hasUserRestorableCouple } from "@/entities/user/models/hasCouple";

import ChevronLink from "@/shared/ui/ChevronLink";

interface Props {
  me: UserDTO;
}

const RestoreCoupleLink: React.FC<Props> = ({ me }) => {
  if (!hasUserRestorableCouple(me)) return null;

  return <ChevronLink href="/my-page/couples/unconnected/restore">커플 정보 복구하기</ChevronLink>;
};

export default RestoreCoupleLink;
