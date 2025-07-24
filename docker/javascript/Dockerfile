FROM node:22-alpine

WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY ./Frontend/package*.json ./

# Instala dependências (vite incluído aqui)
RUN npm install

# Copia o restante do código fonte
COPY ./Frontend/ .

EXPOSE 3000

# Usa npx para garantir que o vite local seja executado, evitando erros PATH
CMD ["npx", "vite", "--port", "3000"]
