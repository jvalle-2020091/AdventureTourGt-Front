import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }


  getCategorys(){
    return this.http.get(environment.baseUri + 'categoryPlace/getCategorys', {headers: this.httpOptions})
  }


  getCategory(id:string){
    return this.http.get(environment.baseUri + 'categoryPlace/getCategory/' + id, {headers: this.httpOptions});
  }

  saveCategory(
    params : {}
  ){
    return this.http.post(environment.baseUri +'categoryPlace/saveCategoryPlace', params, {headers: this.httpOptions});

  }
  updateCategory(id:string, params:{}){
    return this.http.put(environment.baseUri + 'categoryPlace/updateCategoryPlace/' + id, params, {headers: this.httpOptions});
  }

  deleteCategory(id:string){
    return this.http.delete(environment.baseUri + 'categoryPlace/deleteCategoryPlace/' + id, {headers: this.httpOptions});
  }

  requestFiles(categoryId: string, files: Array<File>, name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUri + 'categoryPlace/uploadImage/' + categoryId;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.userRest.getToken());
      xhr.send(formData);
    });
  }
}
