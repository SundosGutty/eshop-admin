import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductsFormComponent } from './products-form/products-form.component';
import { AdminProductsListComponent } from './products-list/products-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminProductsListComponent,
  },
  {
    path: 'form',
    component: AdminProductsFormComponent,
  },
  {
    path: 'form/:id',
    component: AdminProductsFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductsRoutingModule {}
