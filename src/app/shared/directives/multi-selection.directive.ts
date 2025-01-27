import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogConfirmeComponent } from 'src/app/modules/specialiste/disponiblev2/dialog-confirme/dialog-confirme.component';

@Directive({
  selector: '[multiSelection]',
  providers : [DialogService]
})
export class MultiSelectionDirective {
  private divElement: HTMLDivElement | null = null;
  private startX: number = 0;
  private startY: number = 0;
  private isMouseDown = false
  @Input() multiSelection: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2,private dialogService: DialogService) {}

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    console.log('MouseDown');
    this.isMouseDown = true;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.multiSelection && this.isMouseDown) {
      this.handleCheckboxSelection(event);
    }
  }

  @HostListener('mouseup', ['$event'])
  handleMouseUp(event: MouseEvent): void {
    console.log('MouseUp');
    this.isMouseDown = false;

    // Check if divElement exists
    if (this.divElement) {
      // Get the boundaries of the divElement
      const divRect = this.divElement.getBoundingClientRect();

      // Get all label elements
      const labelElements = document.querySelectorAll('label');

      // Iterate through label elements
      labelElements.forEach((label) => {
        // Get the boundaries of the label element
        const labelRect = label.getBoundingClientRect();

        // Check if the boundaries of the divElement intersect with the boundaries of the label element
        if (
          divRect.left < labelRect.right &&
          divRect.right > labelRect.left &&
          divRect.top < labelRect.bottom &&
          divRect.bottom > labelRect.top
        ) {
          // Find the associated input element (checkbox) next to the label
          const inputElement = label.previousSibling as HTMLInputElement | null;

          if (inputElement && inputElement.tagName === 'INPUT' && inputElement.type === 'checkbox') {
            // Do something with the input element (checkbox)
            inputElement.checked = true;
            console.log('Checkbox under divElement:', inputElement);
          }
        }
      });
    }
    
    if(this.multiSelection){

        const ref = this.dialogService.open(DialogConfirmeComponent, {
          header: 'Confirmation',
          width: '30%',
          data: {}
        });
    }
    
    this.divElement = null;
  }

  private handleCheckboxSelection(event: MouseEvent): void {
    if (!this.divElement) {
      // Create the div if it does not exist
      this.divElement = document.createElement('div');
      this.divElement.style.backgroundColor = 'rgb(0 0 255 / 7%)';
      this.divElement.style.border = '2px dashed';
      this.divElement.style.position = 'absolute';
      document.body.appendChild(this.divElement);

      // Save the starting coordinates
      this.startX = event.clientX + window.scrollX;
      this.startY = event.clientY + window.scrollY;
    }

    // Calculate the width and height based on mouse movement
    const width = event.clientX + window.scrollX - this.startX;
    const height = event.clientY + window.scrollY - this.startY;

    // Apply the width and height to the div
    this.divElement.style.width = `${Math.abs(width)}px`;
    this.divElement.style.height = `${Math.abs(height)}px`;

    // Position the div based on mouse movement
    this.divElement.style.left = `${width > 0 ? this.startX : event.clientX + window.scrollX}px`;
    this.divElement.style.top = `${height > 0 ? this.startY : event.clientY + window.scrollY}px`;
  }
}
