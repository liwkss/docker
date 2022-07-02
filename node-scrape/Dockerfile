FROM node:14-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm i puppeteer

RUN apk add --no-cache chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont nodejs yarn

RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]

