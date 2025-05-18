FROM node:20-slim

WORKDIR /apps

RUN corepack enable && apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pnpm install

CMD ["pnpm", "develop"]
