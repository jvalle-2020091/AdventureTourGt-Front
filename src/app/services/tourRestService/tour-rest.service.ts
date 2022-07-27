import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service'; 
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class TourRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json', 'Authorization': this.userRest.getToken(),});

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  //Rutas del Administrador 
  getTours() {
    return this.http.get(environment.baseUri + 'tour/getTours', { headers: this.httpOptions });
  }

  getTour(idTour: string) {
    return this.http.get(environment.baseUri + 'tour/getTour/' + idTour, { headers: this.httpOptions });
  }


  saveTour( idPlace: string, params: {}) {
    return this.http.post(environment.baseUri + 'tour/saveTour/' + idPlace , params, { headers: this.httpOptions });
  }

  updateTour(idPlace: string, id: string, params: {}) {
    return this.http.put(environment.baseUri + 'tour/updateTour/' + idPlace + '/'+ id, params, { headers: this.httpOptions });
  }

  deleteTour(id: string) {
    return this.http.delete(environment.baseUri + 'tour/deleteTour/' + id, { headers: this.httpOptions });
  }


  getTourByPlace(idPlace: string) {
    return this.http.get(environment.baseUri + 'tour/tourByPlace/' + idPlace,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  
  getexhaustedTour() {
    return this.http.get(environment.baseUri + 'tour/exhaustedTour', { headers: this.httpOptions });
  }

   // Solicitar el token
   getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = '';
    }
    return token;
  }

}
