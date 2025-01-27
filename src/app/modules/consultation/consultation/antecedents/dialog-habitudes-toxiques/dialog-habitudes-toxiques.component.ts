import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-habitudes-toxiques',
  templateUrl: './dialog-habitudes-toxiques.component.html',
  styleUrls: ['./dialog-habitudes-toxiques.component.scss']
})
export class DialogHabitudesToxiquesComponent implements OnInit {
  isTabac: boolean = false;
  isAlcool: boolean = false;
  isOther: boolean = false;

  activeIndex = 0;
  perDay = 0;
  // boxPerYear = (20 / this.perDay) / 365
  durationActif = 0;
  durationPassif = 0;
  durationSevre = 0;
  type = 'actif'
  nature = '';

  constructor(private ref: DynamicDialogRef,) { }

  ngOnInit(): void {
  }

  test(){
    alert('hh')
  }

  save(){
    let tabac;
    console.log(this.perDay, 'kk')
    switch (this.activeIndex) {
      case 0:
        tabac = {
            perDay: this.perDay,
            duration: this.durationActif,
            boxPerYear: (this.perDay * 365) / 20,
            type: this.type
          }
        break;
      case 1:
        tabac = {
            duration: this.durationPassif,
            type: this.type
          }
        break;
    
      default:
        tabac = {
          duration: this.durationSevre,
          type: this.type
        }
        break;
    }
    let data = {
      tabac: null,
      alcohol: {
        isAlcoholic: this.isAlcool
      },
      others: null,
    }
    if(this.isTabac){
      //@ts-ignore
      data.tabac = tabac
    }
    if(this.isOther){
      //@ts-ignore
      data.others = {
        nature: this.nature
      }
    }

    this.ref.close(this.removeNullProperties(data))
  }

  removeNullProperties(obj: Record<string, any>): Record<string, any> {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === null) {
        delete obj[key];
      }
    }
    return obj;
  }

}
