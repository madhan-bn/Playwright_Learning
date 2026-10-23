const { chromium } = require('playwright');

(async () => {
  // 1. Launch the browser (headless: false helps you see what is happening)
  const browser = await chromium.launch({ headless: false });
  
  // Set a standard browser User-Agent header so the firewall doesn't block the request immediately
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  try {
    // 2. Open the URL
    const url = 'https://myntra.com';
    console.log(`Navigating to: ${url}...`);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });

    // 3. Wait for the product elements to paint inside the DOM
    const xpathSelector = 'xpath=//ul[@class="results-base"]//span[@class="product-discountedPrice"]';
    await page.waitForSelector(xpathSelector, { timeout: 10000 });

    // 4. Locate all instances matching the price structure
    const priceLocators = page.locator(xpathSelector);
    const count = await priceLocators.count();
    
    if (count === 0) {
      console.log("No elements matching the selector were discovered.");
      return;
    }

    let pricesArray = [];

    // 5. Extract texts, remove string clutter, and populate numeric values
    for (let i = 0; i < count; i++) {
      let rawText = await priceLocators.nth(i).innerText();
      rawText = rawText.trim();
      
      if (rawText) {
        // Strip out "Rs." characters or whitespaces to leave a pure string integer
        let cleanText = rawText.replace(/Rs\.?/gi, '').replace(/,/g, '').trim();
        let numericPrice = parseInt(cleanText, 10);
        
        if (!isNaN(numericPrice)) {
          pricesArray.push(numericPrice);
        }
      }
    }

    // 6. Find and output the single lowest valuation detected
    if (pricesArray.length > 0) {
      const lowestPrice = Math.min(...pricesArray);
      console.log(`\nSuccessfully evaluated ${pricesArray.length} items.`);
      console.log(`=========================================`);
      console.log(`The lowest price on this page is: Rs. ${lowestPrice}`);
      console.log(`=========================================`);
    } else {
      console.log("Failed to process numeric text values from the page nodes.");
    }

  } catch (error) {
    console.error("An error occurred during runtime extraction:", error.message);
  } finally {
    // Keep browser active briefly to confirm page state, then close cleanly
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();
