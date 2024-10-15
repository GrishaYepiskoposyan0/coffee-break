FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run prisma-migrate:prod && npm run prisma-generate && npm start