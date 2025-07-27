#!/bin/bash

echo "🔄 Executando 'prisma generate' dentro do container..."

docker-compose exec api npx prisma generate
