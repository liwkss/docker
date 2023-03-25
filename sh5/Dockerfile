FROM alpine:3.14

RUN apk add --no-cache \
      chromium \
      nodejs \
      yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer-core@10.2.0 express

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

