const axios = require('axios');
const cheerio = require('cheerio');

const webScraper = async () => {
 const html = await axios.get('https://news.ycombinator.com');
 const $ = await cheerio.load(html.data);
 let data = [];
 $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
   if (i <= 3) {
     data.push({
       title: $(elem).text(),
       link: $(elem).find('a.titlelink').attr('href')
       })
     }
});
console.log(data);
}
webScraper();