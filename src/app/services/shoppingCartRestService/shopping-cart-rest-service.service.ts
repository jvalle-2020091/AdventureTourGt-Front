import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartRestServiceService {
  httpOptions = new HttpHeaders().set('content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  myShopping() {
    return this.http.get(environment.baseUri + 'shoppCart/confirmShoppCart', 
      {headers: this.httpOptions.set('Authorization', this.getToken())});
  }

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

  addToShoppingCart(params:{}){
    return this.http.post(environment.baseUri + 'shoppCart/addShoppCart', params, {headers: this.httpOptions.set('Authorization', this.getToken())});
  }

  getTours(){
    return this.http.get(environment.baseUri + 'tour/getTours', {headers: this.httpOptions.set('Authorization', this.getToken())});
  }

}
