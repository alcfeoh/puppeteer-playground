const browser = await puppeteer.launch();

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

const page = await browser.newPage();
await page.goto('https://www.google.com/maps/@38.5774435,-121.4969633,3a,60y,297.35h,91.53t/data=!3m6!1e1!3m4!1sweugVjpV7NxFG3B4m5n-Rg!2e0!7i16384!8i8192');

await page.content();
await delay(4000);
const timemachine = await page.$('button.tactile-timemachine__button-icon.noprint');
await timemachine.click();
await page.screenshot({path: 'screenshot.png'});

await browser.close();
