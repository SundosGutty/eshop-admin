import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html'
})
export class AdminUsersFormComponent implements OnInit, OnDestroy{
    userForm: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentUserId: string;
    modifiedCountries = [];
    cardContent: {} 
    formFields: {}[] = []
    messageState!: {
      message: string,
      class: string
    } | null
    isDialogShow = false
  
    dialogContent!: {
      title: string,
      description?: string,
      buttons :    {
        title : string,
        class: string,
        response: boolean 
    }[]
    } | null

    createUserSubscription: Subscription
    updateUserSubscription: Subscription
    userSubscription: Subscription
  
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}


      ngOnInit(): void {
        this._initUserForm();
        this._getCountries();
        this._checkEditMode();
      }
    
      private _initUserForm() {
        this.userForm = this.formBuilder.group({
          name: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          isAdmin: [false],
          street: [''],
          apartment: [''],
          zip: [''],
          city: [''],
          country: ['']
        });
      }
    
      private _getCountries() {
         let countries = this.usersService.getCountries();
         this.modifiedCountries = countries.map(country => ({
          label: country.name,
          value: country.id
        }));
        this.formFields = [
          { label: 'Name', controlName: 'name', type: 'text', placeholder: 'Category name', colSpan: 3 },
          { label: 'Password', controlName: 'password', type: 'password', placeholder: 'Product brand', colSpan: 3 },
          { label: 'Email', controlName: 'email', type: 'email', placeholder: 'Product price', colSpan: 3 },
          { label: 'Phone', controlName: 'phone', type: 'phone', placeholder: 'Product count in stock', colSpan: 3 },
          { label: 'Country', controlName: 'country', type: 'select', options: this.modifiedCountries, colSpan: 3 },
          { label: 'Street', controlName: 'street', type: 'text', placeholder: 'Select an image', accept: 'image/*', colSpan: 3 },
          { label: 'is Admin', controlName: 'isAdmin', type: 'toggle', colSpan: 3 },
          { label: 'Apartment', controlName: 'apartment', type: 'text', placeholder: 'Category description', colSpan: 3 },
          { label: 'Zip', controlName: 'zip', type: 'number', placeholder: '', colSpan: 3 },
          { label: 'City', controlName: 'city', type: 'text', placeholder: '', colSpan: 3 },
        ];
      }
    
      private _addUser(user: User) {
       this.createUserSubscription=  this.usersService.createUser(user).subscribe(
          (user: User) => {
            this.messageState =  {
              message: `User ${user.name} added successfully`,
              class: 'success'
            }
          },
          () => {
            this.messageState =  {
              message: 'Something went wrong. Please try again later',
              class: 'warning'
            }
          }
          );
          this.goBackToList()
      }
    
      private _updateUser(user: User) {
      this.updateUserSubscription =   this.usersService.updateUser(user).subscribe(
          () => {
            this.messageState =  {
              message: `User ${user.name} updated successfully`,
              class: 'success'
            }
          },
          () => {
            this.messageState =  {
              message: 'Something went wrong. Please try again later',
              class: 'warning'
            }
          }
        );
        this.goBackToList()
      }
    
      private _checkEditMode() {
        this.route.params.subscribe((params) => {
          if (params['id']) {
            this.editMode = true;
            this.currentUserId = params['id'];
           this.userSubscription =  this.usersService.getUser(params['id']).subscribe((user) => {
              this.userForm.patchValue({ name: user.name });
              this.userForm.patchValue({ password: user.password });
              this.userForm.patchValue({email: user.email});
              this.userForm.patchValue({phone: user.phone});
              this.userForm.patchValue({isAdmin: user.isAdmin});
              this.userForm.patchValue({street: user.street});
              this.userForm.patchValue({apartment: user.apartment});
              this.userForm.patchValue({zip: user.zip});
              this.userForm.patchValue({city: user.city});
              this.userForm.patchValue({country: user.country});
    
              this.userForm.get('password').setValidators([]);
              this.userForm.get('password').updateValueAndValidity();
            });
          }
        });
        this.cardContent= {
            btnsPositionStyle :"d-flex justify-content-end flex-wrap",
            title: this.editMode ? 'Edit User' : 'Add User',
            description: this.editMode ? 'You can edit the user' : 'You can add a user',
            btns: [
              {
                action: this.onSubmit.bind(this), 
                icon: 'fa-plus',
                class: 'btn-success me-2',
                btnText: this.editMode ? 'Edit' : 'Create'
              },
              {
                action: this.goBackToList.bind(this),
                icon: 'fa-arrow-left',
                class: 'btn-warning',
                btnText: 'back'
              }
            ]
          }
      }

      goBackToList(){
        timer(500).toPromise().then(()=>{
          this.location.back()
        })
      }
    
      onSubmit() {
        this.userForm.markAllAsTouched()
        if (this.userForm.invalid) {
          return;
        }
        const user: User = {
          id: this.currentUserId,
          name: this.userForm.get('name')?.value,
          password: this.userForm.get('password')?.value,
          email: this.userForm.get('email')?.value,
          phone: this.userForm.get('phone')?.value,
          isAdmin: this.userForm.get('isAdmin')?.value,
          street: this.userForm.get('street')?.value,
          apartment: this.userForm.get('apartment')?.value,
          zip: this.userForm.get('zip')?.value,
          city: this.userForm.get('city')?.value,
          country:this.userForm.get('country')?.value
        };
        if (this.editMode) {
          this._updateUser(user);
        } else {
          this._addUser(user);
        }
      }
    
      onCancle() {
        this.location.back();
      }
    
      get form() {
        return this.userForm.controls;
      }

      ngOnDestroy(): void {
        if (this.userSubscription) this.userSubscription.unsubscribe()
        if (this.updateUserSubscription) this.updateUserSubscription.unsubscribe()
        if (this.createUserSubscription) this.createUserSubscription.unsubscribe()
      }

}