import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyMad'
})
export class CurrencyMadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
