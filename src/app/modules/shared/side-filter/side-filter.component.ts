import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { AttendanceStatus } from '../../../models/UserDailyAttendance';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-filter',
  imports: [
    DropdownComponent,
    DatepickerComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css',
})
export class SideFilterComponent {
  filterForm: FormGroup;
  attendance_status: AttendanceStatus[] = [
    'in_late',
    'in_ontime',
    'out_ontime',
    'undertime',
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      user: [''],
      status: [''],
      attendanceDate: [''],
    });
  }
}
