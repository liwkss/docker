FROM alpine:3.14

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN yarn add puppeteer-core@10.1.0 express
RUN yarn add chrome-aws-lambda@10.1.0

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

