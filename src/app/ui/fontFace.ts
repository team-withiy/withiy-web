import localFont from "next/font/local";

export const PretendardJP = localFont({
  variable: "--f-pretendard-jp",
  src: [
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Thin.woff2",
      weight: "100",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-ExtraLight.woff2",
      weight: "200",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Light.woff2",
      weight: "300",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Regular.woff2",
      weight: "400",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Medium.woff2",
      weight: "500",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Bold.woff2",
      weight: "700",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "./assets/fonts/PretendardJP/PretendardJP-Black.woff2",
      weight: "900",
    },
  ],
  display: "swap",
});
