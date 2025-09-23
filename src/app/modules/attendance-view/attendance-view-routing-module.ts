import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceViewComponent } from './attendance-view/attendance-view.component';

const routes: Routes = [{path: '', component: AttendanceViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceViewRoutingModule { }
