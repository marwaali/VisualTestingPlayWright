import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  let message:string = ""; 
  
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    message = dialog.message();
    dialog.dismiss().catch(() => {});
  });

  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  await page.getByRole('button', { name: 'Bank Manager Login' }).click();
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.getByPlaceholder('First Name').fill('a');
  await page.getByPlaceholder('Last Name').fill('a');
  await page.getByPlaceholder('Post Code').fill('a2222');
  await page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  expect(message).toContain("text")
});