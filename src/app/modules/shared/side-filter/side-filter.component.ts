import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { AttendanceStatus } from '../../../models/UserDailyAttendance';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-side-filter',
  imports: [DropdownComponent, DatepickerComponent, InputComponent],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css',
})
export class SideFilterComponent {
  attendance_status: AttendanceStatus[] = [
    'in_late',
    'in_ontime',
    'onbreak',
    'out_ontime',
    'undertime',
  ];
}
