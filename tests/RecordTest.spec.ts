import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshetty');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('learning');
  await page.locator('label').filter({ hasText: 'Admin' }).locator('span').nth(1).click();
  await page.getByRole('combobox').selectOption('consult');
  await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('Incorrect username/password.').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'Documents request' }).click();
  await page1.getByRole('link', { name: 'mentor@rahulshettyacademy.com' }).click();
  //await page1.getByText('Please email us at mentor@').click();
});