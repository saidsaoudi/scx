import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'go-back',
  standalone : false,
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
