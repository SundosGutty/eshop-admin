import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
  },
  {
    path: 'form',
    component: CategoriesFormComponent,
  },
  {
    path: 'form/:id',
    component: CategoriesFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoriesRoutingModule {}
