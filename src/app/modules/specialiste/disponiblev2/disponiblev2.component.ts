import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disponiblev2',
  templateUrl: './disponiblev2.component.html',
  styleUrls: ['./disponiblev2.component.scss']
})
export class Disponiblev2Component implements OnInit {
  selectedElements: any;
  ischeked: boolean = false;
  multiSelection = false
  checkBoxFromGroup = new FormGroup({})


  @ViewChild('calendarTable') calendarTable : ElementRef
  constructor() {}


  ngOnInit(): void {
  }

  toggleMultiSelection() {
    this.multiSelection = !this.multiSelection;
  }

}
