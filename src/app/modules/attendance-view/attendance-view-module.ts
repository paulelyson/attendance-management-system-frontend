import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceViewRoutingModule } from './attendance-view-routing-module';
import { BadgeComponent } from '../shared/badge/badge.component';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';
import { AttendanceViewTableComponent } from './attendance-view-table/attendance-view-table.component';
import { MatTableModule } from '@angular/material/table';
import { TwelveHourTimePipe } from '../../pipes/twelve-hour-time.pipe';
import { InputComponent } from '../shared/input/input.component';
import { DatepickerComponent } from '../shared/datepicker/datepicker.component';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { AutocompleteComponent } from '../shared/autocomplete/autocomplete.component';
import { ButtonComponent } from '../shared/button/button.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideFilterComponent } from '../shared/side-filter/side-filter.component';
import { TitleSectionComponent } from '../shared/title-section/title-section.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { PaginatorComponent } from '../shared/paginator/paginator.component';

@NgModule({
  declarations: [AttendanceViewComponent, AttendanceViewTableComponent],
  imports: [
    CommonModule,
    AttendanceViewRoutingModule,
    BadgeComponent,
    MatTableModule,
    MatSidenavModule,
    TwelveHourTimePipe,
    InputComponent,
    DatepickerComponent,
    DropdownComponent,
    TitleSectionComponent,
    AutocompleteComponent,
    ButtonComponent,
    SideFilterComponent,
    SpinnerComponent,
    PaginatorComponent,
  ],
})
export class AttendanceViewModule {}
