import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-rendevous',
  templateUrl: './dialog-rendevous.component.html',
  styleUrls: ['./dialog-rendevous.component.scss']
})
export class DialogRendevousComponent implements OnInit {
  date: Date[] | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
