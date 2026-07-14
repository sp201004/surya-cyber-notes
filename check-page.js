import puppeteer from 'puppeteer-core';

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure()?.errorText));

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
    console.log('Root element HTML length:', rootHtml?.length);
    if (rootHtml?.length === 0) {
       console.log('Root element is empty - React likely failed to render.');
    }
    
    await browser.close();
  } catch (err) {
    console.error('Script Error:', err);
  }
})();
