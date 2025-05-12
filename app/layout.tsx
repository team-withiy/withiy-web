import type { Metadata, Viewport } from "next";

import cx from "clsx";

import MSWProvider from "@/app/providers/MSWProvider";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { PretendardJP } from "@/app/ui/fontFace";
import MobileLayout from "@/app/ui/Layout/MobileLayout";

import Alert from "@/shared/ui/Alert/Alert";
import { Toast } from "@/shared/ui/Toast";

import styles from "./layout.module.scss";

import "@/app/ui/styles/global.scss";

export const metadata: Metadata = {
  title: "위디",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cx(PretendardJP.variable, styles.body)}>
        <MSWProvider>
          <ReactQueryProvider>
            <MobileLayout>
              <div id="modal" />
              <div id="toast" />
              <div id="bottom-sheet" />
              <Alert />
              <Toast />
              {children}
            </MobileLayout>
          </ReactQueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
