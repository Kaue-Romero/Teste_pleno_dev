#!/bin/sh

# Garante que os pacotes estão instalados (útil se você tiver montado o volume)
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências..."
  npm install
fi

echo "Iniciando Vite..."
npx vite --port 3000
