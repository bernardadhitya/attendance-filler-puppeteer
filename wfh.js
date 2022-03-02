const puppeteer = require ('puppeteer');

const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSerKhjHwNyMOJCtp36sgpdf7kSZ0d_mFbCCmGxBnU1B4Yf_Nw/viewform';

(async () => {
    const browser = await puppeteer.launch({
      headless: true,
      devtools: false
    })

    const [page] = await browser.pages()
    await page.goto (formURL, { waitUntil: 'networkidle0', timeout: 0 })

    //Skip form headers
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)

    //Fill NIK
    await page.keyboard.press('Space')

    //Search for my NIK
    for (let i=0; i<31; i++){
      await page.keyboard.press('ArrowDown')
      await page.waitFor(50)
    }

    //Select my NIK, move to next field
    await page.keyboard.press('Enter')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)

    //Fill lokasi
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('ArrowDown')
    await page.waitFor(250)

    //Skip WFO location
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)

    //Fill condition
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Space')
    await page.waitFor(250)
    await page.keyboard.press('ArrowDown')
    await page.waitFor(250)
    await page.keyboard.press('Space')
    await page.waitFor(250)

    //Fill body temperature
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('ArrowDown')
    await page.waitFor(250)
    await page.keyboard.press('Space')
    await page.waitFor(250)

    //Submit form
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('ArrowDown')
    await page.waitFor(250)

    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Space')
    await page.waitFor(250)

    await page.waitFor(5000);
    await browser.close();
})()
