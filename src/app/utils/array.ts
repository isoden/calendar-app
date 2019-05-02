/**
 * @file Utility functions for array manipulation.
 */

/**
 * @example
 * times(10, index => index * 2) // => [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
 */
export const times = <Result>(n: number, callback: (index: number) => Result): Result[] =>
  Array.from(Array(n), (_, index) => callback(index))

/**
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // => [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(array: T[], size: number): T[][] =>
  times(Math.ceil(array.length / size), index => array.slice(index * size, index * size + size))
