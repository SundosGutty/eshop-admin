import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-house', route: '/dashboard' },
    { label: 'Products', icon: 'fa-solid fa-briefcase', route: '/products' },
    { label: 'Categories', icon: 'fa-solid fa-list', route: '/categories' },
    { label: 'Orders', icon: 'fa-solid fa-shopping-cart', route: '/orders' },
    { label: 'Users', icon: 'fa-solid fa-users', route: '/users' }
  ];

  dialogContent!: {
    title: string,
    description?: string,
    buttons :    {
      title : string,
      class: string,
      response: boolean 
  }[]
  } | null

  
  constructor(private authService: AuthService) {}

  logoutUser(){
    this.dialogContent = {
      title: 'Are you sure you would like to logout?', 
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
      this.logout()
    }
}

  logout() {
    this.authService.logout();
  }
}
