FROM alpine:3.14

RUN apk add --no-cache \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN yarn add puppeteer-core@10.1.0 express chrome-aws-lambda@10.1.0
RUN node node_modules/puppeteer/install.js
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

