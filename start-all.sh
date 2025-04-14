#!/bin/bash

# Cleanup function: uses existing npm script to stop DB containers.
cleanup() {
  echo "=== Stopping all background processes and database containers ==="
  npm run stop:dev:db
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "=== Starting database and pgAdmin containers ==="
npm run start:dev:db

echo "=== Waiting for the database to be ready (using pg_isready) ==="

until pg_isready -h localhost -p 5432 -q; do
  echo "Database is not ready yet, waiting..."
  sleep 2
done
echo "=== Database is ready! ==="

echo "=== Running database migrations ==="
npm -w server run prisma:migrate

echo "=== Seeding the database ==="

npm -w server run db:seed
SEED_EXIT_CODE=$?

if [ $SEED_EXIT_CODE -ne 0 ]; then
  echo "=== Seed script failed with exit code $SEED_EXIT_CODE. Resetting the database ==="
  # Reset the database using Prisma migrate reset (this will drop all data)
  npm -w server run prisma:migrate:reset
  echo "=== Re-running seed script ==="
  npm -w server run db:seed
  if [ $? -ne 0 ]; then
    echo "=== Seed script still failing. Exiting ==="
    cleanup
  fi
fi


echo "=== Starting backend (NestJS) ==="
npm run start:dev:server &

echo "=== Starting frontend (Next.js) ==="
npm run start:dev:client &

echo "=== All services started. Press Ctrl+C to stop. ==="
wait
