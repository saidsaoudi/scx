import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() class: any
  @Input() data: any
  constructor() { }

  ngOnInit(): void {
  }

}
