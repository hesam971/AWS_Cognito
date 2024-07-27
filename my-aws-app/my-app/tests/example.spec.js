import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('hesam');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('hesam971@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123456abcd');
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').fill('liverpool');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('test');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('test@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123456abcd');
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Favorite Sport or Team$/ }).getByRole('textbox').fill('arsenal');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.locator('input[type="email"]').fill('test1@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123456abc');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('hesam971@gmail.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('123456abcd');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});