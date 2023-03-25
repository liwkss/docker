FROM alpine:3.14

RUN apk add --no-cache \
      nodejs \
      yarn

RUN yarn add puppeteer@10.2.0 express

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

