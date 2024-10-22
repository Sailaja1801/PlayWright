import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

test.describe("Learn Assertions @assertions_group", () => {
    test('Verify web page behaviour @smoke', async ({page}) => {
     await page.goto('https://the-internet.herokuapp.com/')
    //await page.pause()
     //1 To have URL
     await expect(page).toHaveURL('https://the-internet.herokuapp.com/')
      

    //2 To have Title
    await expect(page).toHaveTitle('The Internet')

    

    })

    test('Continue with assertions', async ({page}) => {
    //3 Assert Visibility
    await page.goto('https://the-internet.herokuapp.com/')

    await expect(page.locator('h1')).toBeVisible()


    //4 Assert element to have text

    await expect(page.locator('h2')).toHaveText('Available Examples')

    //5 Assert Contains Text
    await expect(page.locator('body')).toContainText('WYSIWYG')
    //await page.pause()


    })

    test('Continue with assertions part2', async ({page}) => {
    // 6 Assert count
    //await page.pause()
    await page.goto('https://the-internet.herokuapp.com/') 
    await expect(page.locator('a')).toHaveCount(46)
    //await page.pause()

    //7 To be checked

    await page.goto('https://the-internet.herokuapp.com/checkboxes') 
    //await page.pause()

    await page.waitForTimeout(1000) //wait for second
    await page.waitForLoadState('networkidle') //wait for finishing networ activity

    let checkbox = await page.getByRole('checkbox').nth(0) // store element into variable
    await checkbox.waitFor() // wait for stability before interacting

    await page.getByRole('checkbox').nth(0).check();
    await page.getByRole('checkbox').nth(1).uncheck();

    await expect(page.getByRole('checkbox').nth(0)).toBeChecked()
    await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()

    await page.pause()


    


    })
    test('Continue with asserstions part 3', async ({page}) =>  {
        await page.goto('https://the-internet.herokuapp.com/login')

        //8 have value   
        
        //await page.pause()
        await page.locator('#username').fill('tomsmith')
        await expect(page.locator('#username')).toHaveValue('tomsmith')
        //await page.pause()

        //9 element is enabled
        await expect(page.locator('button[type="submit"]')).toBeEnabled();
    })
    test('Continue with asserstions part 4', async ({page}) =>  {
        await page.goto('https://the-internet.herokuapp.com')
       //10 Verify text store in variable
       const headerText = await page.locator('h1').textContent()
        expect(headerText).toBe('Welcome to the-internet')

    })
})