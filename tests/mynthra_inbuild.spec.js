
const { test } = require('@playwright/test');

test('Find least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    const prices = await page.locator('//ul[@class="results-base"]/li/a/div[@class="product-productMetaInfo"]//span[contains(@class,"product-discountedPrice")]').allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace(/[^\d]/g, ''))
    );

    for (let i = 0; i < prices.length; i++) {
        console.log(prices[i]);
    }

    const minPrice = Math.min(...numericPrices);

    console.log('Least Price:', minPrice);
});
