import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true;
   @ViewChild('cardleftElement') cardleftElement!: ElementRef; // Get the div reference
   
    classData: {exist:boolean,className:string}; // Default class
  opened = true;
  title = 'FRONT';
  constructor(private router: Router,private primengConfig: PrimeNGConfig){}

  ngOnInit() {
    this.primengConfig.ripple = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  
}

  loggedIn(): boolean {
    return this.router.url !== '/login';
  }
  toggleSideBar(opened: any){
    this.opened = opened
  }

  cardleft(event:{exist:boolean,className:string}){
    this.classData = event;
    
    if (this.classData.exist) {
      this.cardleftElement.nativeElement.classList.remove(this.classData.className);
      
    }else{
      this.cardleftElement.nativeElement.classList.add(this.classData.className);
    }

  }
}
