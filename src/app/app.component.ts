import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = true;
  title = 'FRONT';
  constructor(private router: Router, private primengConfig: PrimeNGConfig){}

  ngOnInit() {
    this.primengConfig.ripple = true;
}

  loggedIn(): boolean {
    return this.router.url !== '/login';
  }
  toggleSideBar(opened: any){
    this.opened = opened
  }
}
