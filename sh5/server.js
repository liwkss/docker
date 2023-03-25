const puppeteer = require('puppeteer-core')
const express = require('express');



async function scrape() {
   var ret="";
   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage']})
   const page = await browser.newPage()

   await page.goto('https://www.hkab.org.hk/hibor/listRates.do?lang=en&Submit=Detail')

	const text = await page.evaluate(() => Array.from(document.querySelectorAll("body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(n+4):nth-last-child(n+3) > td"), element => element.textContent));
    for(var i=0;i<text.length/2;i++){
		//console.log(text[2*i]+"\t"+text[2*i+1])
		ret = ret+ text[2*i+1]+",";
	}

   browser.close()
   return ret;
}


const app = express();
app.get('/', async(req, res) => {
  const ret=await scrape()
  res.send(ret);
});

app.listen(8080, '0.0.0.0');

