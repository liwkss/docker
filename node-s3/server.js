const puppeteer = require('puppeteer')

async function scrape() {
   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']})
   const page = await browser.newPage()

   await page.goto('https://www.thesaurus.com/browse/smart')
   for(i = 1; i < 6; i++){
    var element = await page.waitForSelector("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a")
    var text = await page.evaluate(element => element.textContent, element)
    console.log(text)
   }
   browser.close()
}
scrape()
