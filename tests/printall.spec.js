
import { test } from '@playwright/test';

test('Least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    const prices = page.locator('//div[@class="product-price"]/descendant::span[@class="product-discountedPrice"]');

    const count = await prices.count();
    const values = [];

    for (let i = 0; i < count; i++) {
        const priceText = await prices.nth(i).innerText();
        const price = Number(priceText.replace(/[^\d]/g, ''));

        const productName = await prices.nth(i)
            .locator('xpath=ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]')
            .innerText();

        console.log('Product Name:', productName, '| Price:', price);

        values.push(price);
    }

    const min = Math.min(...values);

    console.log('Least Price:', min);

    const price = page.locator(`//div[@class="product-price"]/descendant::span[@class="product-discountedPrice"][contains(., "${min}")]`).first();

    console.log('Least Price Product Name:', await price.locator('xpath=ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]').innerText());
});
