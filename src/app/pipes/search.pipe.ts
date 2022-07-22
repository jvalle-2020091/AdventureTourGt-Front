import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(tours: any, search: any) {
        if (search == undefined) {
            return tours;
        } else {
            return tours.filter((tour: any) => {
                return tour.name.toLowerCase().includes(search.toLowerCase());
            })
        }
    }

}