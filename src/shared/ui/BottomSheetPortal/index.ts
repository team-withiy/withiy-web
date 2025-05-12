import dynamic from "next/dynamic";

export const BottomSheetPortal = dynamic(() => import("./BottomSheetPortal"), { ssr: false });
export type { BottomSheetPortalProps } from "./BottomSheetPortal";
