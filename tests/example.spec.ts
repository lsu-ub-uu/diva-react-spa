import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DiVA | Hem/);
});

test('header exists and contains expected elements', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Check if the header exists
  const header = page.locator('header.MuiAppBar-root');
  await expect(header).toBeVisible();

  // Check for the logo
  const logo = page.locator('header img.logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/app/assets/divaLogo.svg');

  // Check for the "Refresh Def" button
  const refreshButton = page.getByRole('button', { name: 'Refresh Def' });
  await expect(refreshButton).toBeVisible();

  // Check for the language selector
  const languageSelector = page.locator('header select[name="language"]');
  await expect(languageSelector).toBeVisible();

  // Check for the "Logga in" button
  const loginButton = page.getByRole('button', { name: 'Logga in' });
  await expect(loginButton).toBeVisible();
});
