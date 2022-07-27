import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartRestServiceService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private http: HttpClient,
    private userRest: UserRestService

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

  addInvoice( params: {}){
    return this.http.post(environment.baseUri + 'invoice/addInvoice' , params , {headers: this.httpOptions});
  }

  getInvoice(id: string){
    return this.http.get(environment.baseUri + 'invoice/getInvoice/' + id,{headers: this.httpOptions})
  }

  cleanShoppCart(){
    return this.http.delete(environment.baseUri + 'shoppCart/deleteShoppCart', {headers: this.httpOptions});
  }

  deleteTour(id:string){
    return this.http.delete(environment.baseUri + 'shoppCart/deleteTourShoppCart/' + id , {headers: this.httpOptions});
  }

}
