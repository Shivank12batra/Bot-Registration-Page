const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
// require executablePath from puppeteer
const { executablePath } = require('puppeteer');

const checkCredentials = async(email, password) => {
    const loginPage = "https://www.sggscc.ac.in/smartprof/index.php";
    try {
        puppeteer.use(
            RecaptchaPlugin({
                provider: {
                    id: '2captcha',
                    token: 'c2f8c49a5952770a638ac845691ef68a' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
                },
                visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
            })
        )
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: executablePath(),
        });
        const page = await browser.newPage();
        await page.goto(loginPage);
        await page.evaluate(() => {
            let radio = document.querySelector('#loginForm input[value=STUDENT]');
            radio.click();
        });
        // await page.click('#loginForm input[value=STUDENT]');
        console.log('hie');
        await page.type('#loginForm input[name=username]', email, {
            delay: 100
        });
        console.log('username typed');
        await page.type('#loginForm input[name=password]', password, {
            delay: 100
        });
        console.log('password typed');

        // Click the captcha
        // await clickCaptcha(page);
        await page.solveRecaptchas();

        // Submit the login form
        await page.click('#loginForm button[name=loginUser]');
        console.log('login successful');
        var url = await page.url();
        console.log(url);
        const page2 = await browser.newPage();
        await page2.goto('https://www.sggscc.ac.in/smartprof/attendance-summary-student.php'); 
        await browser.close()
        return true
    } catch (error) {
        return false
    }
}

module.exports = checkCredentials