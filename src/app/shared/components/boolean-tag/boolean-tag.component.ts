import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'boolean-tag',
  standalone : false,
  templateUrl: './boolean-tag.component.html',
  styleUrls: ['./boolean-tag.component.scss']
})
export class BooleanTagComponent implements OnInit {
  @Input() status: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
