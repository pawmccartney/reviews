FROM node: latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4003
ENTRYPOINT [ "node", "server/index.js" ]
