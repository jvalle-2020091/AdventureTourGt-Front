import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'place'
})
export class PlacePipe implements PipeTransform {

    transform(tours: any, place: any) {
        if (place === undefined) {
            return tours;
        } else {
            return tours.filter((tours: any) => {
                return tours.place.toLowerCase().includes(place.toLowerCase())
            })
        }
    }

}