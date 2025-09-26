import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceUserDetailComponent } from './attendance-user-detail/attendance-user-detail.component';

const routes: Routes = [{ path: '', component: AttendanceUserDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceUserDetailRoutingModule {}
