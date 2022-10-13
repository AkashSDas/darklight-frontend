/**
 * @param promise Promise to handle
 * @returns Array with 2 results [data, error]. If there
 * is an error, data will be null and vice versa
 */
export async function handleAsync(promise: Promise<any>) {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err];
  }
}
