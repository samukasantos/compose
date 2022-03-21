FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install --save
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]
