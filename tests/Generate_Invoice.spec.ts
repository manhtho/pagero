import { test } from '../fixtures/BasePage'

test('Generate Invoice', async ({page}) => {
  await page.goto('http://localhost:3000/invoice');
  await new Promise(r => setTimeout(r, 15000));
})
