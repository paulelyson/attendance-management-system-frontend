import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-datepicker',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  // accessor
  value: string = '';
  disabled: boolean = false;
  public changed = (_: any) => {};
  public touched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.value = event.value?.toLocaleString() ?? '';
    this.changed(this.value);
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.value = this.value + '-' + (event.value?.toLocaleString() ?? '');
    this.changed(this.value);
  }
}
