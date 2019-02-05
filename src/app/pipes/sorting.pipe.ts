import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeSorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: Pokemon.Detail[], ascending: boolean = true): Pokemon.Detail[] {
    return ascending ? this.SortAscending(value) : this.SortDescending(value);
  }

  private SortAscending(list: Pokemon.Detail[]): Pokemon.Detail[] {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  private SortDescending(list: Pokemon.Detail[]): Pokemon.Detail[] {
    return list.sort((a, b) => a.name.localeCompare(b.name) * -1);
  }
}
