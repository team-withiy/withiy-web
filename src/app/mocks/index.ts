export async function initMSW() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_MSW === "enabled") {
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
