import { test } from '@playwright/test';

test('Find least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    const prices = await page.locator('//li[contains(@class,"product-base")]/descendant::div[@class="product-price"]/descendant::span[@class="product-discountedPrice" or not(@class) and text()]').allTextContents();

    let leastPrice;

    async function getLeastPrice() {
        const numbers = prices.map(p =>
            Number(p.match(/[\d,]+/)[0].replace(/,/g, ''))
        );

        leastPrice = Math.min(...numbers);
    }

    async function getProductName() {
        const names = await page.locator('//li[contains(@class,"product-base")]/descendant::div[@class="product-price"]/descendant::span[@class="product-discountedPrice" or not(@class) and text()]/ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]').allTextContents();

        const index = prices.findIndex(p =>
            Number(p.match(/[\d,]+/)[0].replace(/,/g, '')) === leastPrice
        );

        console.log('Least Price:', leastPrice);
        console.log('Product Name:', names[index]);
    }

    await getLeastPrice();
    await getProductName();
});