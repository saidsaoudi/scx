import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'star',
  standalone : false,
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit, OnChanges {
  @Input() numberOfStars = 5
  @Input() level = 0
  numbers: number[] = [];
  numbersLevel: number[] = [];
  @Input() size = 'xs'
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numberOfStars'] || changes['level']) {
      this.numbers = Array.from({length: this.numberOfStars - this.level}, (_, i) => i + 1)
    }
    if (changes['level']) {
      this.numbersLevel = Array.from({length: this.level}, (_, i) => i + 1)
    }
  }
  
}
