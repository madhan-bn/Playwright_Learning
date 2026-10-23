
import { test } from '@playwright/test';

test('Find least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts', {
        waitUntil: 'domcontentloaded'
    });

    const priceXPath = '//li[contains(@class,"product-base")]/descendant::div[@class="product-price"]/descendant::span[@class="product-discountedPrice" or not(@class) and text()]';

    const prices = await page.locator(priceXPath).allTextContents();

    async function getLeastPrice(prices) {
        const numbers = prices.map(p =>
            Number(p.match(/[\d,]+/)[0].replace(/,/g, ''))
        );

        const minimumPrice = Math.min(...numbers);

        const productName = await getProductName(minimumPrice);

        console.log('Least Price:', minimumPrice);
        console.log('Product Name:', productName);
    }

    async function getProductName(price) {
        const nameXPath = `(${priceXPath})[normalize-space()="Rs. ${price}"]/ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]`;

        const name = await page.locator(nameXPath).first().textContent();

        return name;
    }

    await getLeastPrice(prices);
});
