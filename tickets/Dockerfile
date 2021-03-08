FROM node:alpine

ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org --only=prod
COPY . .

CMD ["npm", "start"]