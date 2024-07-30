import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('hesam');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(''); 
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('');
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').fill('liverpool');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('test');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(''); 
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('');
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').fill('arsenal');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('input[type="email"]').fill(''); 
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(''); 
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});
