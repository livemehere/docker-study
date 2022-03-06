FROM node:14.5.0-alpine

WORKDIR /app

COPY . .

RUN npm i

CMD ["node","index.js"]

EXPOSE 3000