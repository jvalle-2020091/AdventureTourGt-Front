import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'places'
})
export class PlacesPipe implements PipeTransform {

  transform(places: any, placeSearch: any){
    if (placeSearch === undefined) {
      return places;
  } else {
      return places.filter((place: any) => {
          return place.name.toLowerCase().includes(placeSearch.toLowerCase())
      })
  }
}

}
