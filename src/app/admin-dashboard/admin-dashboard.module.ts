import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './recipes-routing.module';
import { DashboardComponent } from './admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AdminDashboardRoutingModule,
    SharedModule,
  ]
})
export class AdminDashboardModule {}
