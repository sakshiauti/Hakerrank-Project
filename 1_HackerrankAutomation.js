//node 1_HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

//npm init -y
//npm install minimist
//npm install puppeteer

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);

async function run(){
    let browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized',
        ],
        defaultViewport: null
    });
// get the tabs(there is only one tab)
    let pages = await browser.pages();
    let page = pages[0];

    // open the url
    await page.goto(args.url);

    //click on login1 of page1
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    //click on login2 of page2
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    //type userid
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']", configJSO.userid, {delay:30});

    //type password
    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", configJSO.password, {delay:30});

    //click on page3
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    //click on compete
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click("a[data-analytics='NavBarContests']");

    //click on manage contests
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    //click on first compete
    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

}

run();