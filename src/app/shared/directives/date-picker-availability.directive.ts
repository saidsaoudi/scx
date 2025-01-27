import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDatePickerAvailability]'
})
export class DatePickerAvailabilityDirective implements OnInit {
  @Input() availableDates: string[] = []; // Array of available dates in yyyy-MM-dd format

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const inputElement = this.el.nativeElement;
    inputElement.addEventListener('input', () => {
      const selectedDate = inputElement.value;
      if (this.availableDates.indexOf(selectedDate) === -1) {
        inputElement.value = ''; // Clear the input if the selected date is not available
      }
    });
  }
}
