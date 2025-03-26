export async function initMSW() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}
