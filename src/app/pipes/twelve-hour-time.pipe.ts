import { Pipe, PipeTransform } from '@angular/core';
import { convertTimeTo12HourFormat } from '../utils/user-attendance-detail.util';

@Pipe({
  name: 'twelveHourTime',
})
export class TwelveHourTimePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!value || !/^\d{2}:\d{2}$/.test(value)) {
      return value;
    }
    return convertTimeTo12HourFormat(value);
  }
}
