import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");

    if (process.env.NEXT_PUBLIC_MSW === "enabled") {
      const { server } = await import("@/app/mocks/server");
      server.listen({
        onUnhandledRequest: "bypass",
      });
    }
  }
}

export const onRequestError = Sentry.captureRequestError;
