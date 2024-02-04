import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AdminAuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AdminAuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminAuthdModule {}
