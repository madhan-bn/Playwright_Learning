
import { test } from '@playwright/test';

test('Least price T-shirt', async ({ page }) => {
    await page.goto('https://www.myntra.com/boy-tshirts');

    const priceList = page.locator('//div[@class="product-price"]/descendant::span[@class="product-discountedPrice"]');

    const prices = (await priceList.allTextContents())
        .map(p => Number(p.replace(/[^\d]/g, '')));

    const minimumPrice = Math.min(...prices);

    console.log('Least Price:', minimumPrice);

    const productName = page.locator(`//li[contains(@class,"product-base")]/descendant::span[@class="product-discountedPrice"][contains(., "${minimumPrice}")]/ancestor::div[@class="product-productMetaInfo"]/child::h4[@class="product-product"]`).first();
    
    console.log('Product Name:', await productName.innerText());
    
});
