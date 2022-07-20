import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class PlaceRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken(),
  });

  constructor(
    private http : HttpClient,
    private userRest: UserRestService
  ) { }
  getPlace(idCategory: string, id: string){
    return this.http.get(environment.baseUri + 'place/getPlaceByCategory/' + idCategory + '/'+ id, {headers: this.httpOptions});
  }

  getPlaces(id: string){
    return this.http.get(environment.baseUri + 'place/getPlacesByCategory/' + id , {headers: this.httpOptions});
  }

  savePlace(id: string, params : {}){
    return this.http.post(environment.baseUri + 'place/savePlace/' + id, params ,{headers: this.httpOptions});
  }

  updatePlace(idCategory: string, id: string, params: {}){
    return this.http.put(environment.baseUri + 'place/updatePlace/' + idCategory + '/' + id, params, {headers: this.httpOptions});
  }

  deletePlace(idCategory: string, id: any){
    return this.http.delete(environment.baseUri + 'place/deletePlace/' + idCategory + '/' + id, {headers: this.httpOptions});
  }
}
