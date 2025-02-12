import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-sidebar',
  standalone: false,
  templateUrl: './content-sidebar.component.html',
  styleUrls: ['./content-sidebar.component.scss']
})
export class ContentSidebarComponent implements OnInit {
  @Input() menu: any
  showSubMenu = false;
  @ViewChild('child') childRef!: ContentSidebarComponent;
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  toggleSubMenu($event: any, item: any){
    $event.stopPropagation();
    console.log('Router', item.routerLink)
    if(!item.routerLink){
      item.showSubMenu = !item.showSubMenu
      this.hideSubMenus(item)
      console.log(item)
    }
  }
  hideSubMenus(item: any){
    item.children.forEach((elm: any) => {
      elm.showSubMenu = false;
      if(elm.children && elm.children.length){
        this.hideSubMenus(elm)
      }
    });
  }

}
