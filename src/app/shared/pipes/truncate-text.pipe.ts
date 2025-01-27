import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, maxLength: number = 25): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}
