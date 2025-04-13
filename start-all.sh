#!/bin/bash

cleanup() {
  echo "===Stopping all background processes==="
  pkill -P $$
  docker compose -f compose.dev.yml down
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "===Starting database and pgAdmin containers==="
npm run start:dev:db

echo "===Waiting for the database to be ready==="
sleep 3
npm -w server run prisma:migrate

echo "Running seed script..."
npx ts-node apps/server/prisma/seed.ts
SEED_EXIT_CODE=$?

if [ $SEED_EXIT_CODE -ne 0 ]; then
  echo "===Seed script failed with exit code $SEED_EXIT_CODE. Resetting the database==="
  npx prisma migrate reset --force --skip-seed
  echo "===Re-running seed script==="
  npx ts-node apps/server/prisma/seed.ts
  if [ $? -ne 0 ]; then
    echo "===Seed script still failing. Exiting==="
    cleanup
  fi
fi

echo "===Starting backend (NestJS)==="
(cd apps/server && npm run start:dev) &

echo "===Starting frontend (Next.js)==="
(cd apps/client && npm run dev) &

echo "===All services started. Press Ctrl+C to stop.==="
wait
