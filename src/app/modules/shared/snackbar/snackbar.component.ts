import { Component } from '@angular/core';

type SnackBarType = 'primary'

export interface ISnackBarConfig {
  type: SnackBarType;
  message: string[]
  header?: string;
  action?: string[]
  icon: string;
}

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {

}
