const puppeteer = require('puppeteer')
const express = require('express');

let browser;


async function scrape() {
    var ret="";
	let page;
	try{
		if(!browser) browser = await puppeteer.launch({
			headless: true,
			ignoreHTTPSErrors: true,
			args: ['--no-first-run','--no-sandbox', '--no-zygote','--disable-accelerated-2d-canvas', '--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-gpu'],
		});
		page = await browser.newPage()

		await page.goto('https://www.hkab.org.hk/en/rates/hibor')

		const text = await page.evaluate(() => Array.from(document.querySelectorAll("#__nuxt > div > main > div.section_container.for_hibor > div > div > div:nth-child(1) > div > div > div.general_table_cell.last > div"), element => element.textContent));
		for(var i=1;i<text.length;i++){
			console.log(text[i]);
			//console.log(text[2*i]+"\t"+text[2*i+1])
			ret = ret+ text[i]+",";
		}
	}catch(e){
		console.log(e);
	}finally{
		if(page){
			await page.close();
		}
	}
    return ret;
}


const app = express();
app.get('/', async(req, res) => {
  const ret=await scrape()
  res.send(ret);
});

app.listen(8080, '0.0.0.0');

