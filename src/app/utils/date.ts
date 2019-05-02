/**
 * @file Utility functions to use date objects immutable.
 */

export const mutate = (date: Date, mutation: (date: Date) => void): Date => {
  const newDate = new Date(date)

  mutation(newDate)

  return newDate
}

export const addMonth = (date: Date, amount: number): Date => mutate(date, d => d.setMonth(d.getMonth() + amount))

export const setDate = (date: Date, amount: number): Date => mutate(date, d => d.setDate(amount))

export const getFirstDateOfMonth = (date: Date): Date => mutate(date, d => d.setDate(1))

export const getLastDateOfMonth = (date: Date): Date =>
  mutate(date, d => {
    d.setMonth(d.getMonth() + 1)
    d.setDate(0)
  })
