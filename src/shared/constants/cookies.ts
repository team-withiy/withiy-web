export const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
} as const;
