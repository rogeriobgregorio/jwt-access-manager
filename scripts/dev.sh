#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento com Docker..."

docker-compose down
docker-compose up --build
