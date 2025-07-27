#!/bin/bash

echo "📦 Executando migração Prisma dentro do container NestJS..."

docker-compose exec api npx prisma migrate dev
