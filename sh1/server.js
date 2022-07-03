const puppeteer = require('puppeteer')

async function scrape() {
   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']})
   const page = await browser.newPage()

   await page.goto('https://www.hkab.org.hk/hibor/listRates.do?lang=en&Submit=Detail')
   for(i = 4; i <=11; i++){
    var eT = await page.waitForSelector("body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child("+i+") > td:nth-child(1)")
    var eR = await page.waitForSelector("body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child("+i+") > td:nth-child(1)")
    var text = await page.evaluate(eT => eT.textContent, eT) + await page.evaluate(eR => eR.textContent, eR)
    console.log(text)
   }
   browser.close()
}
scrape()
