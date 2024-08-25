/**
 * Checks an object and returns the keys where the value is empty or falsy.
 *
 * @param obj - The object to check.
 * @returns An array of keys where the corresponding values are empty or falsy.
 */
export function checkEmptyKey<T extends object>(obj: T): (keyof T)[] {
  const keys = Object.keys(obj) as (keyof T)[]

  // Filter the keys array to find those keys whose values are empty or falsy
  const emptyKeys = keys.filter((key) => !obj[key])

  return emptyKeys
}
