import type { UserDTO, UserWithActiveCoupleDTO, UserWithRestorableCoupleDTO } from "../api/user.interface";

export const hasUserCouple = (me: UserDTO): me is UserWithActiveCoupleDTO => {
  return "hasCouple" in me && me.hasCouple;
};

export const hasUserRestorableCouple = (me: UserDTO): me is UserWithRestorableCoupleDTO => {
  return "hasRestorableCouple" in me && me.hasRestorableCouple;
};

export const hasUserCoupleWithFirstMetDate = (me: UserDTO): me is UserWithActiveCoupleDTO => {
  return hasUserCouple(me) && !!me.couple.firstMetDate;
};
