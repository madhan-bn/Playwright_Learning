import {test} from '@playwright/test'

test('intro', async({page})=>{
await page.goto("https://www.amazon.in/");

await page.waitForTimeout(2000);

const url = await page.url();
console.log(url)

const title = await page.title();
console.log(title);

await page.goto("https://www.facebook.com/");

await page.goBack();
await page.goForward();
await page.reload();

await page.goto("https://www.facebook.com/");
await page.waitForTimeout(2000);
await page.goBack();
await page.goForward();
await page.reload();

await page.goto("https://www.udemy.com/");

await page.goBack();
await page.goForward();
await page.reload();
await page.waitForTimeout(2000);

await page.screenshot({
    path :'Madan.png',
    fullpage:true
})

})