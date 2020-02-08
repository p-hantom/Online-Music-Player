import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
    formatTime(timestamp): string {
        timestamp = Math.floor(timestamp);
        let minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0');
        let second = (timestamp % 60).toString().padStart(2, '0');
        return `${minute}:${second}`;
    }

    transform(value: any, args?: any): string {
        return this.formatTime(value);
    }

}
