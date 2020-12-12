FROM node:alpine

ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .

CMD ["npm", "start"]