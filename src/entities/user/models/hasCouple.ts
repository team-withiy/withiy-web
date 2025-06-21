import type { UserDTO, UserWithCoupleDTO } from "../api/user.interface";

export const hasUserCouple = (me: UserDTO): me is UserWithCoupleDTO => {
  return me.hasCouple;
};

export const hasUserCoupleWithFirstMetDate = (me: UserDTO): me is UserWithCoupleDTO => {
  return hasUserCouple(me) && !!me.couple.firstMetDate;
};
