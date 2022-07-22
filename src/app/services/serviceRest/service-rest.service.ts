import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';


@Injectable({
  providedIn: 'root'
})

export class ServiceRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
    constructor(
      private http: HttpClient,
      private userRest: UserRestService

    ) { }

    saveService(params : {}){
      return this.http.post(environment.baseUri +'service/saveService', params, {headers: this.httpOptions});
    }

    updateService(id:string, params:{}){
      return this.http.put(environment.baseUri + 'service/updateService/' + id, params, {headers: this.httpOptions});
    }

    deleteService(id:string){
      return this.http.delete(environment.baseUri + 'service/deleteService/'+ id, {headers: this.httpOptions})
    }

    getServices(){
      return this.http.get(environment.baseUri + 'service/getServices', {headers: this.httpOptions})
    }

    getService(id: string){
      return this.http.get(environment.baseUri +'service/getService/' +id, {headers: this.httpOptions});
    }

}
