const puppeteer = require ('puppeteer');

const formURL = 'https://bit.ly/Absen_IT_DM';
const dropDownRootElemSelector = 'div.quantumWizMenuPaperselectEl';
const nik = '21059319';

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: false
    })

    const [page] = await browser.pages()
    await page.goto (formURL, { waitUntil: 'networkidle0', timeout: 0 })

    //Fill NIK
    while(await page.evaluate(dropDownRootElemSelector => !document.querySelector(dropDownRootElemSelector).classList.contains('isFocused'), dropDownRootElemSelector)){
      await page.keyboard.press('Tab')
      await page.waitFor(250)
    }

    await page.keyboard.press('Space')

    while(await page.evaluate (dropDownRootElemSelector => document.querySelector(dropDownRootElemSelector).lastElementChild.childElementCount === 0, dropDownRootElemSelector)) {
      await page.waitFor(200)
    }

    const optionExist = async () => {
      await page.evaluate((dropDownRootElemSelector, desiredOption) => {
        var optionsDropDown = []
        document.querySelectorAll(dropDownRootElemSelector + ' > div[role="presentation"] ~ div[role="presentation"] > div[role="option"] ~ div[role="presentation"] ~ div[role="option"]').forEach(elem => optionsDropDown.push(elem.textContent))  
        
        return ( optionsDropDown.includes(desiredOption))
      }, dropDownRootElemSelector, nik)
    }

    if (optionExist()) {
      await page.keyboard.press('ArrowDown')
    }

    while (await page.evaluate((dropDownRootElemSelector) => document.querySelector(dropDownRootElemSelector + ' > div[role="presentation"] ~ div[role="presentation"] > div[role="option"] ~ div[role="presentation"] ~ div[role="option"].isSelected') === null, dropDownRootElemSelector)){
      await page.waitFor(250)
    }

    while(optionExist() && await page.evaluate((dropDownRootElemSelector, desiredOption) => document.querySelector(dropDownRootElemSelector + ' > div[role="presentation"] ~ div[role="presentation"] > div[role="option"] ~ div[role="presentation"] ~ div[role="option"].isSelected').dataset.value !== desiredOption, dropDownRootElemSelector, nik) ) {
      await page.keyboard.press('ArrowDown')
      await page.waitFor(50)
    }

    await page.keyboard.press('Enter')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)

    //Fill lokasi
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('ArrowDown')
    await page.waitFor(250)
    await page.keyboard.press('Space')

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
    await page.keyboard.press('Enter')
    await page.waitFor(250)

    //Fill body temperature
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Tab')
    await page.waitFor(250)
    await page.keyboard.press('Space')

    //Submit form
    // await page.keyboard.press('Tab')
    // await page.waitFor(250)
    // await page.keyboard.press('Space')
})()