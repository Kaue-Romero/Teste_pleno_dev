FROM node:22-alpine

WORKDIR /app

COPY ./Frontend/package*.json ./
RUN npm install

COPY ./Frontend .

EXPOSE 3000

CMD ["npm", "run", "dev"]
