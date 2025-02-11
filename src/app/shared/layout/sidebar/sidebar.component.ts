import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MENU} from './sidebar-items'

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu = MENU;
  opened = true;
  @Output() toggle = new EventEmitter<any>();
  @Output() changeStyle = new EventEmitter<{exist:boolean,className:string}>();
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    // this.authService.logout()
  }

  toggleSideBar(){
    this.opened = !this.opened
    this.toggle.emit(this.opened)
    if(this.opened){
      this.changeStyle.emit({exist:true,className:'new-tolpabr'})
    }else{
      this.changeStyle.emit({exist:false,className:'new-tolpabr'})
    }
  }


}
