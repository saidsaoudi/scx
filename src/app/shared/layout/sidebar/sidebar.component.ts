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
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    // this.authService.logout()
  }

  toggleSideBar(){
    this.opened = !this.opened
    this.toggle.emit(this.opened)
  }

}
