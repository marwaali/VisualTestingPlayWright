import { test, expect } from '@playwright/test';


test('Calling Get API', async ({ request }) => {
  const newIssue = await request.get('us/90210');
  expect(newIssue.ok()).toBeTruthy();
  let body = JSON.parse(await newIssue.text())
  expect(body['country abbreviation']).toBe('US');
});

test('Get state', async ({ request }) => {
  const newIssue = await request.get('us/90210');
  expect(newIssue.ok()).toBeTruthy();
  let body = JSON.parse(await newIssue.text())
  expect(body.places[0].state).toBe('California');
  let myAyray = body.places;
  console.log(myAyray.find(x => x.state === 'California')['state abbreviation']);
  
  
});
