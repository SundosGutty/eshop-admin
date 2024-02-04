import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '../services/users.service';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  transform(countryKey: string): string {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }
    return 'Unknown Country';
  }
}