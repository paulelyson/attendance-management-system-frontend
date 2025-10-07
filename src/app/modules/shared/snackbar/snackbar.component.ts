import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

type SnackBarType = 'primary' | 'success' | 'warning' | 'danger' | 'dafault';

export interface ISnackBarConfig {
  type: SnackBarType;
  message: string[];
  header?: string;
  action?: string[];
  icon: string;
}

@Component({
  selector: 'app-snackbar',
  imports: [CommonModule, MatIcon],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
})
export class SnackbarComponent {
  isList: boolean = false;
  hasHeader: boolean = false;
  type = 'primary';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public config: ISnackBarConfig) {}
}
