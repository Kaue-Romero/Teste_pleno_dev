#!/bin/bash
set -e

cd /var/www/html

echo "📦 Ajustando permissões (como root)..."
chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
chmod -R 775 storage bootstrap/cache || true

# Garante que .env existe
if [ ! -f .env ]; then
  echo "Copiando .env.example..."
  cp .env.example .env
fi

# Instala dependências do Composer
echo "Instalando dependências do Composer..."
composer install
echo "Executando composer dump-autoload..."
composer dump-autoload

# Gera APP_KEY se necessário
if [ -z "$(grep ^APP_KEY= .env | cut -d '=' -f2-)" ]; then
  echo "Gerando APP_KEY..."
  php artisan key:generate --force
fi

# Executa migrations
php artisan migrate --force

exec "$@"
