const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

(async () => {
 const html = await axios.get('https://www.example.com');
 const dom = new JSDOM(html.data);

 const title = dom.window.document.querySelector('h1');

 if (title) {
   console.log(title.textContent)
 }
})();