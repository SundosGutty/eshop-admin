import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminProductsFormComponent } from './products-form/products-form.component';
import { AdminProductsListComponent } from './products-list/products-list.component';
import { AdminProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    AdminProductsFormComponent,
    AdminProductsListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminProductsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminProductsdModule {}
