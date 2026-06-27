const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
    await page.goto('http://localhost:3001/deals', { waitUntil: 'networkidle0' });
    const html = await page.content();
    if (html.includes('No deals found') || html.includes('React Error') || html.includes('Next.js')) {
      console.log("HTML CONTAINS ERROR OR NO DEALS.");
    }
    const dealsCount = await page.evaluate(() => document.querySelectorAll('.group.relative.flex.flex-col').length);
    console.log(`Deals visible on screen: ${dealsCount}`);
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
