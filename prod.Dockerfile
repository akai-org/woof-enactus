FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add openssl

FROM base AS deployer
COPY . /woof-deploy
WORKDIR /woof-deploy
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=server deploy --legacy ./deploy/backend
RUN pnpm --filter=client deploy --legacy ./deploy/frontend

FROM base AS builder
WORKDIR /woof-build
COPY --from=deployer /woof-deploy/deploy/backend ./backend
COPY --from=deployer /woof-deploy/deploy/frontend ./frontend
WORKDIR /woof-build/backend
RUN pnpm prisma generate
RUN pnpm build
WORKDIR /woof-build/frontend
RUN pnpm chakra:typegen
RUN pnpm build

FROM base AS frontend
WORKDIR /woof-frontend
COPY --from=builder /woof-build/frontend/.next/static ./.next/static
COPY --from=builder /woof-build/frontend/.next/standalone .
COPY --from=builder /woof-build/frontend/public ./public
CMD [ "node", "server.js" ]

FROM base AS backend
WORKDIR /woof-backend
COPY --from=builder /woof-build/backend/dist ./dist
COPY --from=builder /woof-build/backend/prisma ./prisma
COPY --from=builder /woof-build/backend/node_modules ./node_modules
COPY --from=builder /woof-build/backend/package.json .
COPY --from=builder /woof-build/backend/pnpm-workspace.yaml .
CMD [ "pnpm", "start" ]
