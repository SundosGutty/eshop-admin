import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminOrdersDetailsComponent } from './orders-details/orders-details.component';
import { AdminOrdersListComponent } from './orders-list/orders-list.component';
import { AdminOrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    AdminOrdersDetailsComponent, 
    AdminOrdersListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminOrdersRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminOrdersdModule {}
