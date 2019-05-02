import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CalendarRoutingModule } from './calendar-routing.module'
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component'
import { CalendarComponent } from './components/calendar/calendar.component'

@NgModule({
  declarations: [CalendarPageComponent, CalendarComponent],
  imports: [CommonModule, CalendarRoutingModule]
})
export class CalendarModule {}
