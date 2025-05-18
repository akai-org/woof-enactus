FROM node:20-slim

WORKDIR /app

ENV PORT=1337

RUN corepack enable && apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps ./apps

RUN pnpm --filter blog... install --frozen-lockfile --prod

WORKDIR /app/apps/blog
RUN mkdir -p public/uploads
RUN pnpm build || echo "no build step"

CMD ["pnpm", "start"]
