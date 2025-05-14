"use client";

import dynamic from "next/dynamic";

const Toast = dynamic(() => import("./Toast"), { ssr: false });

export { Toast };
export { default as useToast } from "./useToast";
