const puppeteer = require('puppeteer');

(async () => {
  let url = 'https://bit.ly/Absen_IT_DM'

  let browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  let page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  await browser.close();
})();