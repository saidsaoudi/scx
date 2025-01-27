import {
  Component,
  OnInit,
  Directive,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.component.html',
  styleUrls: ['./disponibilite.component.scss']
})
export class DisponibiliteComponent implements OnInit {
  private startCoords: { x: number; y: number } | null = null;
  private boxElement: HTMLElement | null = null;
  checked: boolean = false;
  selectedElements: any;
  ischeked: boolean = false;
  multiSelection = false
  checkBoxFromGroup = new FormGroup({})
  private isMouseDown: boolean = false;


  @ViewChild('calendarTable') calendarTable : ElementRef
  constructor(private renderer: Renderer2) {}


  ngOnInit(): void {
  }

  handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    console.log('MouseDown')
    this.isMouseDown = true;
}

handleMouseUp(event: MouseEvent): void {
  console.log('MouseUp')
    this.isMouseDown = false;
}

handleCheckboxSelection(event: MouseEvent): void {
  if (this.isMouseDown) {
    // Récupérez l'élément cliqué (target) pour vérifier s'il s'agit d'une case à cocher
    const target = event.target as HTMLElement;

    // Vérifiez si l'élément cliqué est une case à cocher
    if (target.tagName === 'TD') {
      // Traitez la sélection de la case à cocher ici
      console.log('Checkbox selected:', target);

      // Ajoutez le contenu de la cellule à la console
      console.log('Cell content:', target.textContent);

      // Vous pouvez également accéder à la case à cocher à partir de la cellule si elle est présente
      const checkbox = target.querySelector('input[type="checkbox"]');
      if (checkbox) {
        (checkbox as HTMLInputElement).checked = true
        console.log('Checkbox value:', (checkbox as HTMLInputElement).checked);
      }
    }
  }
}


  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      this.handleCheckboxSelection(event);
    }
  }



  toggleMultiSelection() {
    this.multiSelection = !this.multiSelection;
  }




  // @ViewChildren('checkboxes') checkboxess: QueryList<ElementRef>;

  // private extractHtmlFromRange(range: Range): string {
  //   const div = document.createElement('div');
  //   div.appendChild(range.cloneContents());
  //   return div.innerHTML;
  // }

  // @HostListener('document:selectionchange', ['$event'])
  // onSelectionChange(event: Event) {
  //   const selection = window.getSelection();

  //   // Check if the selection is not empty
  //   if (selection && selection.toString().trim() !== '') {
  //     // Handle the selected text or elements here
  //     console.log('Selected text:', selection.toString());

  //     // Get all the checkboxes in the current range
  //     const selectedCheckboxes = this.getSelectedCheckboxes(selection);

  //     // Set isChecked to true for each selected checkbox
  //     selectedCheckboxes.forEach((checkbox) => {
  //       checkbox.isChecked = true;
  //     });

  //     // You can perform actions based on the selected text or elements
  //   }
  // }

  cheked: boolean = false;
  // private getSelectedCheckboxes(selection: Selection): any[] {
  //   const range = selection.getRangeAt(0);
  //   const selectedHtml = this.extractHtmlFromRange(range);
  //   console.log('Selected HTML:', selectedHtml);

  //   // Parse the selected HTML string into a DOM element
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = selectedHtml;

  //   // Find checkbox elements within the parsed DOM element
  //   const checkboxes = tempDiv.querySelectorAll('input[type="checkbox"]');

  //   // Convert NodeList to array for easier manipulation
  //   const checkboxArray = Array.from(checkboxes).filter((element) => {
  //     return element instanceof HTMLInputElement && element.type === 'checkbox';
  //   });
  //   const chekdata = checkboxArray.map((x) => x.getAttribute('id'));

  //   this.checkboxess.forEach((checkboxRef) => {
  //     const checkbox: HTMLInputElement = checkboxRef.nativeElement;

  //     if (chekdata.indexOf(checkbox.id) !== -1) {
  //       checkbox.checked = true;
  //     }
  //   });

  //   console.log(chekdata);
  //   console.log(this.checkboxess);

  //   return checkboxArray;
  // }

}
