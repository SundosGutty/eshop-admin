import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, timer } from "rxjs";
import { User } from "src/app/shared/models/user";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html'
})
export class AdminUsersListComponent implements OnInit, OnDestroy{
    users: User[] = []
    isDialogShow = false
    currentId: string
    usersSubscription : Subscription

    messageState!: {
      message: string,
      class: string
    } | null
  
    dialogContent!: {
      title: string,
      description?: string,
      buttons :    {
        title : string,
        class: string,
        response: boolean 
    }[]
    } | null

    cardContent = {
        title:"Users" ,
        btnsPositionStyle:"btn-group",
        description: "List of all users",
        btns: [{routeTo: './form', icon: 'fa-plus', class: 'btn-success', btnText: 'New'}]
      }

    tableBtns= [
        {
          class: 'btn btn-primary me-2',
          action: this.updateUser.bind(this),
          icon: 'fa-solid fa-pen-to-square'
    
        }, 
        {
          class: 'btn btn-danger',
          action: this.deleteUser.bind(this),
          icon: 'fa-solid fa-trash'
        }
    ]

      constructor(
        private usersService: UsersService,
        private router: Router
      ) {}


      ngOnInit() : void{
        this._getUsers()
      }

      private _getUsers(){
       this.usersSubscription =  this.usersService.getUsers().subscribe((users: User[])=>{
            this.users = users
       })
      }

      deleteUser(categoryId: string){
        this.currentId = categoryId
        this.isDialogShow = true
        this.dialogContent = {
          title: 'Are you sure you would like to delete this user?', 
          buttons: [
            {
              title: 'Cancel', 
              class: 'btn btn-secondary',
              response: false
            },
             {
              title: 'Confirm',
              class: 'btn btn-primary',
              response: true
            }
          ]
    
        }
    
      }

      shouldDelete(ans: boolean){
        this.dialogContent = null
        if (ans){
        this.usersService.deleteUser(this.currentId).subscribe(()=>{
          this.messageState =  {
            message: 'User was deleted successfully',
            class: 'success'
          }
        }, ()=>{
          this.messageState =  {
            message: 'Something went wrong. Please try again later',
            class: 'warning'
          }
        })
      }
      timer(2000)
      .toPromise()
      .then(() => {
        this._getUsers();
        this.messageState = null
      });
    }


      updateUser(userid: string) {
        this.router.navigateByUrl(`users/form/${userid}`);
      }

      ngOnDestroy(): void {
        if (this.usersSubscription) this.usersSubscription.unsubscribe()
      }

}