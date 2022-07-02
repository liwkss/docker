# Docker Puppeteer Dev
A dockerized [Puppeteer](https://github.com/GoogleChrome/puppeteer) development environment, to work with the [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) Node API locally.

Read more [here](https://vsupalov.com/headless-chrome-puppeteer-docker/).

## Getting Started
Make sure you have Docker and docker-compose installed and configured so your current user can use both.

Build and run the container:
```
$ make rebuild
```

Wait for the following lines
```
Creating dockerpuppeteerdev_puppeteer_1 ... done
Attaching to dockerpuppeteerdev_puppeteer_1
```

In another terminal session, enter the container:
```
$ make enter
```

Install puppeteer:
```
$ yarn install
```

Now you can run your code within the container:
```
$ node index.js
```

## Next Steps

You can play around with puppeteer and try stuff out! Currently, the code
simply fetches a website and saves a screenshot to the output folder.

As both code and output are mounted from the host, you can develop using
your local editor, and see results you're producing. Changes to your code
are available in the container right away. Upon a restart, you won't need
to reinstall any dependencies.

## Adding OS Packages

If you need other tools or libraries, you'll need to adjust the
Dockerfile and rebuild the image. It won't clutter your local system and
you can be certain that you can work with puppeteer on different OS flavors
without finding out how to install dependencies there.

## Adding Node Packages

Use `yarn add package_name`, which will persist the package into both `package.json` and `yarn.lock` between container restarts. Check out [this part](https://yarnpkg.com/lang/en/docs/cli/add/) of the yarn docs for more details.

## A Word of Caution

This setup, is meant only for development. Puppeteer starts Headless Chrome
in complete disregard of security concerns for once. Also, you'll be running
your code as root.

## Links

* [Puppeteer](https://github.com/GoogleChrome/puppeteer)
* [Getting started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)

* [Using Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Discussion on the no-sandbox issue](https://github.com/GoogleChrome/puppeteer/issues/290#issuecomment-322921352)
