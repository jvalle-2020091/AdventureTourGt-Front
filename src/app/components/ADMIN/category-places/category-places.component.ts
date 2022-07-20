import { Component, OnInit } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category/category-rest.service';
import { CategoryModel } from 'src/app/models/category.model';
import Swal from 'sweetalert2';
import { UserRestService } from '../../../services/userRest/user-rest.service';
import { User } from '@firebase/auth';
//import { UploadImageService } from 'src/app/services/user/upload-category.service';
@Component({
  selector: 'app-category-places',
  templateUrl: './category-places.component.html',
  styleUrls: ['./category-places.component.css']
})
export class CategoryPlacesComponent implements OnInit {
  category: any;
  identity: any;
  categorys: any;
  token: any;
  role: any;
  categoryId: any;
  categoryUpdate: any;
  filesToUpload:any;

  constructor(
    private categoryRest: CategoryRestService,
    private userRest: UserRestService
  ) {
    this.category = new CategoryModel('','','')
   }

  ngOnInit(): void {
    this.getCategorys();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
   

  }

  getCategory(id: string){
    this.categoryRest.getCategory(id).subscribe({
      next: (res:any)=>{
        this.categoryUpdate = res.category;
      },
      error: (err)=> alert(err.error.message)
    })
  }

  getCategorys(){
    this.categorys = [];
    this.categoryRest.getCategorys().subscribe({
      next: (res:any) => 
        this.categorys = res.categorys,  
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  saveCategory(addCategoryForm: any) {
    this.categoryRest.saveCategory(this.category).subscribe({
      next: (res:any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCategorys();
        addCategoryForm.reset();      
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  updateCategory(){
    this.categoryRest.updateCategory( this.categoryUpdate._id, this.categoryUpdate).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getCategorys();
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  deleteCategory(id: string){
    this.categoryRest.deleteCategory(id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          title: res.message + ' ' + res.categoryDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getCategorys();
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

}