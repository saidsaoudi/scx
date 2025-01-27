import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: Date): string {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return 'Invalid Date';
    }

    const daysOfWeek = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ];

    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];

    const dayOfWeek = daysOfWeek[value.getDay()];
    const day = String(value.getDate()).padStart(2, '0');
    const month = months[value.getMonth()];
    const year = String(value.getFullYear());

    return `${dayOfWeek} ${day} ${month} ${year}`;
  }
}
