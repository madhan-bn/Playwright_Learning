import {test} from "@playwright/test"


test ('Drop Down' , async({page}) =>{

    await page.goto('https://www.amazon.in/');

    await page.getByTitle("Search in")
        .selectOption('Appliances');


})