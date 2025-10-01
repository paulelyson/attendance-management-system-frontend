import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IUserAttendanceDetailByDay } from '../../../models/AttendanceUserDetail';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [MatTableModule],
})
export class TableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: IUserAttendanceDetailByDay[] = [];
  isloading: boolean = true;

  ngAfterViewInit(): void {
    this.isloading = false;
  }
}
