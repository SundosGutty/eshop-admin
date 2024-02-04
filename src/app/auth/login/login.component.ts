import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit , OnDestroy{
  loginForm: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  authLoginSubscription: Subscription
  formFields = [
    { label: 'Email', controlName: 'email', type: 'email', placeholder: 'Email', colSpan: 10 },
    { label: 'Password', controlName: 'password', type: 'password', placeholder: 'Password', colSpan: 10 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.invalid) return;
  
    const { email, password } = this.loginForm.value; 
  
   this.authLoginSubscription =  this.auth.login(email, password).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

  get loginFormGroup() {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    if (this.authLoginSubscription) this.authLoginSubscription.unsubscribe()
  }
}
