const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await logIn(page, 'test', 'password');
    await getScreenshotOfStats(page);
    await browser.close();
}

async function logIn(page, username, password) {
    await page.goto('https://www.flightmemory.com/');
    await page.content();
    await page.click("input[name='username']");
    await page.keyboard.type(username);
    await page.click("input[name='passwort']");
    await page.keyboard.type(password);
    await page.click("input[type='submit']");
    return page.content();
}

async function getScreenshotOfStats(page) {
    await page.goto('https://www.flightmemory.com/signin/?go=statistik');
    await page.content();
    return page.screenshot({path: 'flightmemory.png', fullPage: true})
}

run();
