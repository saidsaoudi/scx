import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-allergiques',
  templateUrl: './dialog-allergiques.component.html',
  styleUrls: ['./dialog-allergiques.component.scss']
})
export class DialogAllergiquesComponent implements OnInit {
  allergy: any[] = [];
  constructor(private ref: DynamicDialogRef,) { }

  ngOnInit(): void {
  }

  save(){

    this.ref.close(
      this.allergy
    )

  }

}
