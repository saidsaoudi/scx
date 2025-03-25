import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  @ViewChild('toolbar') toolbar!: ElementRef; // Get the div reference
  items: any[] | undefined;

  selectedItem: any;

  suggestions: any[] ;
  
  classData: {exist:boolean,className:string}; // Default class
  // @Input() styleClass!: string;
 @Output() changeStyle = new EventEmitter<{exist:boolean,className:string}>();
  @Input() opened: any = true
  currentDate!: Date;
  currentTime!: String;

  constructor() { }

  search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
  ngOnInit(): void {
    
    setInterval(() => {
      this.currentDate = new Date();
      const hours = String(this.currentDate.getHours()).padStart(2, '0'); // Display hours in 24-hour format
      const minutes = String(this.currentDate.getMinutes()).padStart(2, '0');
      this.currentTime = hours+':'+minutes
    }, 1000);
  }

  logout(){
     window.location.href = '/login'
  }
  goToHome(){
    window.location.href = '/dashboard'
  }
  goTms(){
    window.location.href = '/tms'
  }
  goAlertManagement(){
    window.location.href = '/alerts-management'
  }
  goApprovisionnement(){
    window.location.href = '/approvisionnement'
  }
  updateStyle(event: {exist:boolean,className:string}) {
    console.log("Received style event:", event);
    this.classData = event;
    this.changeStyle.emit(event)
    if (this.classData.exist) {
      this.toolbar.nativeElement.classList.remove(this.classData.className);
      
    }else{
      this.toolbar.nativeElement.classList.add(this.classData.className);
    }
  }
}
