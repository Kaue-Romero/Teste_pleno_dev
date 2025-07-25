FROM node:22-alpine

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para cache)
COPY ./Frontend/package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY ./Frontend/ .

# Copia o entrypoint
COPY ./docker/javascript/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

# Usa entrypoint para rodar o projeto e fazer o npm install se necessário
CMD ["/entrypoint.sh"]
