import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/dashboard/pages/users/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    const isUpperCase = args[0] === 'upperCase';
    const fullName = `${value.name} ${value.lastName}`;

    return isUpperCase ? fullName.toUpperCase() : fullName;
  }
}
