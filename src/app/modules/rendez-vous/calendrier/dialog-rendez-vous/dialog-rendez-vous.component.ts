import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-rendez-vous',
  templateUrl: './dialog-rendez-vous.component.html',
  styleUrls: ['./dialog-rendez-vous.component.scss']
})
export class DialogRendezVousComponent implements OnInit {

  data: any;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data = this.config.data
    console.log('DATA', this.data)
  }

  goToPatientDetail(){
    this.ref.close();
    this.router.navigate(['/patients/detail', this.data.patient.id]);
  }

}
