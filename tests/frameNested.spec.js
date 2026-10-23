import { test } from '@playwright/test';

test('oneFrameTest', async ({ page }) => {
    await page.goto("https://www.hyrtutorials.com/p/frames-practice.html");

    const iframes2 = page.frameLocator('//iframe[@id="frm2"]');

    await iframes2.locator('//input[@id="firstName"]').fill("Madankumar");
    await iframes2.locator('//input[@id="lastName"]').fill("Balavelmurugan");
    await iframes2.locator('//input[@id="malerb"]').check();
    await iframes2.locator('//input[@id="englishchbx"]').check();
    await iframes2.locator('//input[@id="email"]').fill("madan@gmail.com");
    await iframes2.locator('//input[@id="password"]').fill("9958538530");

    const iframes3 = page.frameLocator('//iframe[@id="frm3"]');
    const iframe3_1 = iframes3.frameLocator('//iframe[@id="frm2"]');

    await iframe3_1.locator('//input[@id="firstName"]').fill("Madankumar");
    await iframe3_1.locator('//input[@id="lastName"]').fill("Balavelmurugan");
    await iframe3_1.locator('//input[@id="malerb"]').check();
    await iframe3_1.locator('//input[@id="englishchbx"]').check();
    await iframe3_1.locator('//input[@id="email"]').fill("madhan@yahoo.com");
    await iframe3_1.locator('//input[@id="password"]').fill("rehr4j4o");

});