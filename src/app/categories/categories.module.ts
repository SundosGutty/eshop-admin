import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

@NgModule({
  declarations: [
   CategoriesFormComponent,
   CategoriesListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AdminCategoriesRoutingModule,
    SharedModule
  ]

})
export class AdminCategoriesdModule {}
