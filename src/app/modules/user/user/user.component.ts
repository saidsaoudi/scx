import { Component, OnInit, ViewChild } from '@angular/core';
import { TabView } from 'primeng/tabview';
@Component({
  selector: 'app-user',
  standalone : false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  value3: string ;
  value : any
  constructor(){}

  ngOnInit(): void {
    
  }

  @ViewChild('tabView') tabView: TabView;
  activeTabIndex = 0;
  tabArray = [1, 2, 3, 4, 5];

  handleCloseLeft(event: any) {
    this.tabArray.splice(event.index, 1);
    this.activeTabIndex = this.tabArray.length - 1;
    this.tabView.cd.detectChanges(); // = this.activeTabIndex;
  }

}
