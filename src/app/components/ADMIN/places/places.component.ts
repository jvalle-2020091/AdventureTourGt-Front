import { Component, OnInit } from '@angular/core';
import { placeModel } from 'src/app/models/place.model';
import { UserModel } from 'src/app/models/user.model';
import { PlaceRestService } from 'src/app/services/placeRest/place-rest.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { UserRestService } from '../../../services/userRest/user-rest.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
place: placeModel;
user: UserModel;
places: any;
placeId: any;
identity:any;
idCategory: any;
filesToUpload: any;
placeUpdate: any;

token: any;
role: any;

  constructor(
    private placeRest : PlaceRestService,
    private uploadImageRest : UploadImageService,
    private userRest: UserRestService,
    private activatedRoute: ActivatedRoute 
  ) { 
    this.place = new placeModel('','','',''),
    this.user = new UserModel('', '','','','','','','')
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idCategory = idRuta.get('idCategory');
    });
    this.getPlaces();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
   
  }
  savePlace(addPlaceForm: any){
    this.placeRest.savePlace(this.idCategory, this.place).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getPlaces();
        addPlaceForm.reset()
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  updatePlace(){
    this.placeRest.updatePlace(this.idCategory  ,this.placeUpdate._id ,this.placeUpdate).subscribe({
      next : (res: any)=>{
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getPlaces();  
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  getPlace(id: string){
    this.placeRest.getPlace(this.idCategory, id).subscribe({
      next: (res:any)=> this.placeUpdate = res.place,
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  getPlaces(){
    this.placeRest.getPlaces(this.idCategory).subscribe({
      next: (res:any) =>
      this.places = res.places,
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  deletePlace(id: string){
    this.placeRest.deletePlace(this.idCategory, id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message + ': ' + res.placeDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        })
        this.getPlaces();
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }


//FUNCIONES IMG

filesChange(inputFile:any){
  this.filesToUpload = <Array<File>>inputFile.target.files;
  console.log(this.filesToUpload);
}

uploadImage(){
  this.uploadImageRest.requestFiles(this.identity._id, this.filesToUpload, 'image')
  .then((res:any)=>{
    let resClear = JSON.parse(res);
    if(!resClear.error){
      alert(resClear.message);
      localStorage.setItem('identity', JSON.stringify(resClear.updateUser));
    }else{
      console.log(res)
    }
  })
}


}
