import { test, expect } from '@playwright/test';


test('Calling Post API', async ({ request }) => {
  const newIssue = await request.get('us/90210');
  expect(newIssue.ok()).toBeTruthy();
  let body = JSON.parse(await newIssue.text())
  expect(body['country abbreviation']).toBe('US');
});


