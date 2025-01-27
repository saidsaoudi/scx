import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(birthdate: string): string {
    if (!birthdate) {
      return 'N/A';
    }

    const today = new Date();
    const birthDate = new Date(birthdate);

    // Calculate the age
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return (age - 1).toString(); // Subtract 1 from age if birthday hasn't occurred yet this year
    }

    return age.toString()+' ans';
  }
}
