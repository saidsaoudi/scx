import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() opened: any = true
  currentDate!: Date;
  currentTime!: String;

  constructor() { }

  ngOnInit(): void {
    
    setInterval(() => {
      this.currentDate = new Date();
      const hours = String(this.currentDate.getHours()).padStart(2, '0'); // Display hours in 24-hour format
      const minutes = String(this.currentDate.getMinutes()).padStart(2, '0');
      this.currentTime = hours+':'+minutes
    }, 1000);
  }

  logout(){
     window.location.href = '/login'
  }
  goToPatientsList(){
    window.location.href = '/dashbord'
  }
}
