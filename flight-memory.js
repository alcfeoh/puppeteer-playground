const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await logIn(page, 'test', 'password');
    await logIn(page, 'test', 'demo');
    console.log('in');
    await enterNewFlight(page, {
        departureCode: 'SMF',
        arrivalCode: 'CDG',
        departureDate: '2019-06-13',
        departureTime: '15:46',
        arrivalDate: '2019-06-14',
        arrivalTime: '08:34'
    });
    await page.screenshot({path: 'flightmemory.png', fullPage: true});
    await browser.close();
}

async function logIn(page, username, password) {
    await page.goto('https://www.flightmemory.com/');
    await page.click("input[name='username']");
    await page.keyboard.type(username);
    await page.click("input[name='passwort']");
    await page.keyboard.type(password);
    return page.click("input[type='submit']");
}

async function getScreenshotOfStats(page) {
    await page.goto('https://www.flightmemory.com/signin/?go=statistik');
    return page.screenshot({path: 'flightmemory.png', fullPage: true});
}

async function enterNewFlight(page, flightInfo) {
    await page.goto('https://www.flightmemory.com/signin/?go=flugdaten_neu');
    await page.content();
    console.log('here');
    await page.click("input[name='ab_3letter']");
    await page.keyboard.type(flightInfo.departureCode);
    await page.click("input[name='an_3letter']");
    await page.keyboard.type(flightInfo.arrivalCode);
    console.log('apts');
    await page.click("input[name='ab_datum_eingabe']");
    await page.keyboard.type(flightInfo.departureDate);
    console.log('date1');
    await page.click("input[name='an_datum_eingabe']");
    await page.keyboard.type(flightInfo.arrivalDate);
    await page.click("input[name='ab_zeit_eingabe']");
    console.log('dates');
    await page.keyboard.type(flightInfo.departureTime);
    await page.click("input[name='an_zeit_eingabe']");
    await page.keyboard.type(flightInfo.arrivalTime);
    console.log('done');
    return page.click("input[type='submit']");
}

try {
    run();
} catch(error) {
    console.error(error);
}

