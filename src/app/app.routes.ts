import { Routes } from '@angular/router';

export const routes: Routes = [{
 path: '',
 loadChildren: ()=> import('./modules/attendance/attendance-module').then(m => m.AttendanceModule)
}];
