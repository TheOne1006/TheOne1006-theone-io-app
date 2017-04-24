/**
 * @flow
 */
export async function generateRandomNumber() {
  console.log('generateRandomNumber');
  // simulate an asynchronous operation
  return new Promise((res) => setTimeout(res, 1000))
    .then(() => Math.floor(Math.random() * 100));
}
