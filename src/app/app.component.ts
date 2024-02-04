import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-admin-pan';
  hideSideBar = true

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.router.url === '/login')this.hideSideBar = true
      else this.hideSideBar = false
    });
}

}


