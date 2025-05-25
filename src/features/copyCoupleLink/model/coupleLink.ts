export const generateCoupleLink = (code: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/couples/invitations?code=${code}`;
};
