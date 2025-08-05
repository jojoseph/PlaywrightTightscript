import { test, expect, chromium } from '@playwright/test';

test('Load Browser in URL', async () =>
{
// chrome - plugins/cookies
const browser = await chromium.launch();
const context =await browser.newContext();
const page = await context.newPage();
await page.goto ('https://rahulshettyacademy.com/loginpagePractise');

    console.log(await page.title());
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
// css, xpath
await page.locator("#username").fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await page.locator("#signInBtn").click();
await page.waitForTimeout(5000)
await browser.close();
});

