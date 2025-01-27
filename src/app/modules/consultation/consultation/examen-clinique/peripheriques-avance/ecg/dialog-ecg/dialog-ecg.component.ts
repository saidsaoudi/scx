import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-ecg',
  templateUrl: './dialog-ecg.component.html',
  styleUrls: ['./dialog-ecg.component.scss']
})
export class DialogEcgComponent implements OnInit {
  visible:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  onclick()
  {
    this.visible = !this.visible
  }

}
