import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { AttendanceStatus } from '../../../models/UserDailyAttendance';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ISideFilter } from '../../../models/SideFilter';
import { NavigationExtras, Params, Router } from '@angular/router';
import { americanDateToISODate } from '../../../utils/date.util';

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
export class SideFilterComponent implements OnChanges {
  @Input() filters: ISideFilter = {};
  filterForm: FormGroup;
  attendance_status: AttendanceStatus[] = ['in_late', 'in_ontime', 'out_ontime', 'undertime'];
  url: string = '';
  navigationExtras: NavigationExtras = {
    queryParams: {},
    queryParamsHandling: 'merge',
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.url = this.router.url.split('?')[0];
    this.filterForm = this.fb.group({
      user: [''],
      status: [''],
      attendanceDate: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      let startDate = this.filters.startDate;
      let endDate = this.filters.endDate;
      this.filterForm.controls['status'].patchValue(this.filters.status);
      this.filterForm.controls['attendanceDate'].patchValue(`${startDate}-${endDate}`); //eg. 10/13/2025-10/14/2025
    }
  }

  onDateChanged() {
    const date: string = this.filterForm.controls['attendanceDate'].value;
    const [startDate, endDate] = date.split('-');
    (this.navigationExtras.queryParams as Params)['startDate'] = americanDateToISODate(startDate); // converted american to iso format
    (this.navigationExtras.queryParams as Params)['endDate'] = americanDateToISODate(endDate); // converted american to iso format
    this.navigate('', null);
  }

  navigate(param: string = '', value = null) {
    (this.navigationExtras.queryParams as Params)['page'] = 1
    if (param) {
      (this.navigationExtras.queryParams as Params)[param] = this.filterForm.controls[param].value;
    }
    this.router.navigate([this.url], this.navigationExtras);
  }
}
