import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import { permission } from 'process';

let browser;
let context;
let page;


test.describe("Describe block for hooks", () => {
    test.beforeAll(async () =>  {
        // launch browser before all test
        browser = await chromium.launch({headless: true})
        console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER")
        })
        
        test.beforeEach(async () => {
            //create context for browser
            context = await browser.newContext()
            // create new page
            page = await context.newPage()
            //navigate to test URL
            await page.goto('https://the-internet.herokuapp.com/');
           // add a pause
           await page.pause()
        
        })
        
        test.afterEach(async () => {
            //close page and context
            await page.close()
            await context.close()
            console.log("AFTER EACH HOOK CLOSED PAGE")
            
        })
        
        test.afterAll(async () => {
            //close the browser
            await browser.close()
            console.log("AFTER ALL HOOK CLOSED BROWSER")
        })
    test('A/B Test', async () => {
        await page.click('text="A/B Testing"')
        const header = await page.textContent('h3')
        expect(header).toBe('A/B Test Variation 1')
    })
    
    test('Checkbox verification', async () => {
        await page.click('text="Checkboxes"')
        const checkbox = await page.isChecked('input[type="checkbox"]:first-child')
        expect(checkbox).toBe(false)
    
    })
    
    test('GeoLocation Setting in context and verification', async () => {
    context = await browser.newContext({
        permissions: ['geolocation'],
        geolocation: {latitude:37.386052, longitude:-122.083851},
        viewport: {width: 1280, height: 720}
    })
    page = await context.newPage()
    await page.pause()
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    await page.click('button')
    const lat = await page.textContent("#lat-value")
    const long = await page.textContent("#long-value")
    expect(parseFloat(lat)).toBeCloseTo(37.386052)
    expect(parseFloat(long)).toBeCloseTo(-122.083851)
    
    
      
    })

})