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
    // this.authSerivce.logout()
  }
  goToPatientsList(){
    window.location.href = '/dashbord'
  }
  goToRendezVous(){
    window.location.href = '/rendez-vous'
  }
  goToSpecialiste(){
    window.location.href = '/specialiste/planning'
  }
  goToDisponibilite(){
    window.location.href = '/specialiste/disponibilite'
  }
  goToDisponibilitev2(){
    window.location.href = '/specialiste/disponibilitev2'
  }
  goToTeleexpertise(){
    window.location.href = '/teleexpertise'
  }
  goToTeleconsultation(){
    window.location.href = '/teleconsultation'
  }
  getFormattedDate() {
    const daysOfWeek = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ];

    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];
    let date = new Date();
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear());

    const currentDate = `${dayOfWeek} ${day} ${month} ${year}`;
    

    return currentDate;
  }

  
}
