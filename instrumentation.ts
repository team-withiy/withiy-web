export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("@/app/mocks/server");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  }
}
