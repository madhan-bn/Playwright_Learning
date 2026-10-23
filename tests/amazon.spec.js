
import { test } from '@playwright/test';

test('Add highest-rated iPhone 17 Pro to cart', async ({ page }) => {

    await page.goto('https://www.amazon.in/', {
        waitUntil: 'domcontentloaded'
    });

    await page.locator('#twotabsearchtextbox').fill('iPhone 17 Pro');
    await page.locator('#twotabsearchtextbox').press('Enter');

    const productNameXPath =
        '//span[contains(text(),"iPhone 17 Pro ")]';

    const productRatingXPath =
        productNameXPath +
        '/ancestor::div[@data-cy="title-recipe"]' +
        '/following-sibling::div[@data-cy="reviews-block"]' +
        '/child::div/span[contains(@class,"a-size-small")]';

    await page.locator(productRatingXPath).first().waitFor({
        state: 'visible',
        timeout: 20000
    });

    const ratingTexts = await page.locator(productRatingXPath).allTextContents();

    const ratings = ratingTexts
        .map(r => Number.parseFloat(r.trim()))
        .filter(Number.isFinite);

    if (ratings.length === 0) {
        throw new Error('No product ratings found.');
    }

    const maxRating = Math.max(...ratings);

    console.log('Maximum rating:', maxRating);

    const addToCartXPath =
        `//span[contains(text(),"iPhone 17 Pro ")]/ancestor::div[@data-cy="title-recipe"]/following-sibling::div[@data-cy="reviews-block"]/child::div/span[contains(@class,"a-size-small")][normalize-space(.)="${maxRating}"]/ancestor::div[@role="listitem"]/descendant::input[@name="submit.addToCart"]`;

    const addToCartButton = page.locator(addToCartXPath);

    // await addToCartButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await addToCartButton.click();

    console.log('Added product with rating:', maxRating);
});
