import { test, expect } from '@playwright/test';

test("Learning selectors", async ({page}) => {
    // navigate to the webpage
    await page.goto('http://127.0.0.1:5500/clickMe.html')

    //1 Selecting by ID
    await page.locator('#clickButton').click()

    // 2 Selecting by Class
    await page.locator('.button-style').click()

    //3 By tag Name and Class
    await page.locator('button.button-style').click()

    //4 Attribute value
    await page.locator('[data-action="increment"]').click()
    await page.locator('[id ="clickButton"]').click()
    await page.locator('[class ="button-style"]').click()

     //5 Partial Attribute
    await page.locator('[role ="button"]').click()

    //6 By text content
    await page.locator('text=CLICK ME').click()

    //7 Combine selectors for precision, class and text
    await page.locator('.button-style:text("CLICK ME")').click()

   //8 find elemets containg specific text, has-text
   await page.locator('button:has-text("CLICK M")').click()

   // Attribute at text
   await page.locator('[data-action="increment"]:text("CLICK ME")').click()

    await page.pause()
   

})