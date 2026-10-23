
const { test } = require('@playwright/test');

test('Find least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    await page.waitForSelector('//ul[@class="results-base"]/li/a/div[@class="product-productMetaInfo"]');

    const names = await page.locator('//ul[@class="results-base"]/li/a/div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]').allTextContents();

    const prices = await page.locator('//ul[@class="results-base"]/li/a/div[@class="product-productMetaInfo"]//span[contains(@class,"product-discountedPrice")]').allTextContents();
    //ul[@class="results-base"]/li/a/div[@class="product-productMetaInfo"]//span[contains(@class,"product-discountedPrice")]/ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]

    let minPrice = Infinity;
    // let minName = '';

    for (let i = 0; i < prices.length; i++) {
        let price = Number(prices[i].replace(/[^\d]/g, ''));

        // console.log(names[i], '-', prices[i]);

        if (price < minPrice) {
            minPrice = price;
            // minName = names[i];
        }
    }

    // console.log('Least Price Product:', minName);
    console.log('Least Price:', minPrice);
});
