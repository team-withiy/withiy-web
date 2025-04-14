# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

LABEL maintainer="rldnd <gi981226@gmail.com>"
LABEL description="withiy-web"
LABEL license="MIT"

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

FROM base AS builder

ARG STAGE=prod

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm && pnpm run build:${STAGE}

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
