const puppeteer = require('puppeteer')

async function scrape() {
   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']})
   const page = await browser.newPage()

   await page.goto('https://www.hkab.org.hk/hibor/listRates.do?lang=en&Submit=Detail')
   for(i = 4; i <=11; i++){
    var e = await page.waitForSelector("body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child("+i+")")
    var text = await page.evaluate(e => e.children[0].textContent +"\t"+ e.children[1].textContent, e)
    console.log(text)
   }
   browser.close()
}
scrape()
