import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(userMessages: any, message: any): any {
    if (message === undefined || message === '') { return userMessages; } //else {

    console.log(userMessages[0]);

    //return userMessages.filter(data => {
      //return data.message.toLowerCase().includes(message.toLowerCase()); } );
    //return null;
    //}
  }
}
