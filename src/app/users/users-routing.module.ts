import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersFormComponent } from './users-form/users-form.component';
import { AdminUsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUsersListComponent,
  },
  {
    path: 'form',
    component: AdminUsersFormComponent,
  },
  {
    path: 'form/:id',
    component: AdminUsersFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {}
