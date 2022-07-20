import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }
  requestFiles(
    userId: string,
    files: Array<File>,
    name: string
  ){
    return new Promise((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUri + '/uploadImage/'+ userId;

      for(var x = 0; x < files.length; x++){
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){ //AJAX status 4 = ok/done
          if(xhr.status == 200){
            resolve(xhr.response);
          }else{
            reject(xhr.response);
          }   
        }
      }

      xhr.open('POST', uri, true);
     // xhr.setRequestHeader('Authorization', this.userRest.getToken());
      xhr.send(formData)
    })
  }
}
