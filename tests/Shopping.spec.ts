import { test, expect } from '@playwright/test';

test('Shopping', async ({ page }) => {
  const nameEmail = 'joboyjosepht@gmail.com';
  const password = '1234567';
  const productName = 'ZARA COAT 3';
  const products = page.locator('.card-body');

  // Navigate to the page
  await page.goto('https://rahulshettyacademy.com/client/#');

  // Verify the presence of text elements
  await expect(page.getByText('Register to sign in with your')).toBeVisible();
  await expect(page.getByText('Log in')).toBeVisible();

  // Fill in login form
  await page.getByRole('textbox', { name: 'email@example.com' }).fill(nameEmail);
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Wait for the first product card to be visible
  await products.first().waitFor();

  // Get all text contents of product titles
  const titles = await page.locator('.card-body b').allTextContents();
  console.log('Product titles:', titles);

  // Iterate through products to find the matching product name
  const count = await products.count();
  let found = false;
  for (let i = 0; i < count; i++) {
    const text = await products.nth(i).locator('b').textContent();
    if (text === null) {
      throw new Error(`No <b> element found in card-body at index ${i}`);
    }
    if (text === productName) {
      console.log(`Found product: ${text}`);
      found = true;
      await page.getByRole('button', { name: ' Add To Cart' }).first().click();
      break; // Exit the loop once the product is found
    }
  }
  // Assert that the product was found
  if (!found) {
    throw new Error(`Product "${productName}" was not found in the product list`);
  }
  await expect(found).toBeTruthy();

   await page.locator('.fas.fa-bars').click();
   await page.getByRole('button', { name: '   Cart' }).click();
   expect(page.getByRole('heading', { name: 'My Cart' }));
   await page.locator("div li").first().waitFor();
   const boole = await expect(page.locator(`h3:has-text("${productName}")`)).toBeVisible();
   await page.pause();
  });