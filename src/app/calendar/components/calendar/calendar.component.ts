import { Component, OnInit } from '@angular/core'

import { times, chunk } from '../../../utils/array'
import { setDate, getLastDateOfMonth, getFirstDateOfMonth, addMonth } from '../../../utils/date'

type CalendarDate = {
  date: Date
  type: 'previous' | 'current' | 'next'
}

const datesOfDate = (date: Date): CalendarDate[] => {
  const lastDate = getLastDateOfMonth(date).getDate()

  return times<CalendarDate>(lastDate, index => ({
    date: setDate(date, index + 1),
    type: 'current'
  }))
}

const pastDates = (date: Date): CalendarDate[] => {
  const firstDayOfMonth = getFirstDateOfMonth(date).getDay()
  const pastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1) // 前月の1日
  const lastDateOfPastMonth = getLastDateOfMonth(pastMonth).getDate()
  const amount = firstDayOfMonth

  return times<CalendarDate>(amount, index => ({
    date: setDate(pastMonth, lastDateOfPastMonth - amount + index + 1),
    type: 'previous'
  }))
}

const futureDates = (date: Date): CalendarDate[] => {
  const endDayOfMonth = getLastDateOfMonth(date).getDay()
  const pastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1) // 前月の1日
  const amount = 7 - (endDayOfMonth + 1)

  return times<CalendarDate>(amount, index => ({
    date: setDate(pastMonth, index + 1),
    type: 'next'
  }))
}

const datesOfWeeks = (date: Date): CalendarDate[][] => {
  const daysOfWeek = 7

  return chunk([...pastDates(date), ...datesOfDate(date), ...futureDates(date)], daysOfWeek)
}

@Component({
  selector: 'ca-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  set activeDate(date: Date) {
    this._activeDate = date
    this._datesOfWeeks = datesOfWeeks(this.activeDate)
  }

  get activeDate(): Date {
    return this._activeDate
  }

  // tslint:disable-next-line:variable-name
  private _activeDate!: Date

  get datesOfWeeks() {
    return this._datesOfWeeks
  }

  // tslint:disable-next-line:variable-name
  private _datesOfWeeks: CalendarDate[][] = []

  constructor() {}

  ngOnInit(): void {
    this.activeDate = new Date()
  }

  onNavigate(amount: number): void {
    this.activeDate = addMonth(this.activeDate, amount)
  }
}
