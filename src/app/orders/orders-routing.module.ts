import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrdersDetailsComponent } from './orders-details/orders-details.component';
import { AdminOrdersListComponent } from './orders-list/orders-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminOrdersListComponent,
  },
  {
    path: 'details/:id',
    component: AdminOrdersDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOrdersRoutingModule {}
