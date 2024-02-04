import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminUsersFormComponent } from './users-form/users-form.component';
import { AdminUsersListComponent } from './users-list/users-list.component';
import { AdminUsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    AdminUsersFormComponent,
    AdminUsersListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminUsersRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminUsersdModule {}
