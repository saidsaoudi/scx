import { Component,  EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-assistant-ia',
  templateUrl: './assistant-ia.component.html',
  styleUrls: ['./assistant-ia.component.scss']
})
export class AssistantIaComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  save(){
    this.stepEmitter.emit(6)
  }
  Previous(){
    this.stepEmitter.emit(4)
  }
}
