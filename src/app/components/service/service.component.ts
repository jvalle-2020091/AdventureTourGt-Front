import { Component, OnInit, OnDestroy} from '@angular/core';
import { ServiceRestService } from 'src/app/services/serviceRest/service-rest.service';
import { ServiceModel } from 'src/app/models/service.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: any;
  service: ServiceModel;
  serviceGetId: any

  constructor(
    private serviceRest: ServiceRestService
  ) { 
   this.service = new ServiceModel('','','',0)
  }

  ngOnInit(): void {
  this.getServices ();
  }

  ngOnDestroy(): void {
    

  }
 
  getServices(){
    this.services= [];
    this.serviceRest.getServices().subscribe({
      next: (res: any) => {
      this.services = res.services;
      console.log(this.services )
    },
    error: (err: any) =>{
      console.log(err);
    },
    });
  }
  
 

  saveService(addServiceForm:any){
    this.serviceRest.saveService(this.service).subscribe({
      next: (res:any)=> {
        Swal.fire ({ icon: 'success', title: res.message,});
        this.getServices();
        addServiceForm.reset();
    },
    error:(err)=>{Swal.fire({icon: 'warning', title: err.error.message || err.error, });
  }, 
  })
 }


 getService(id:string){
  this.serviceRest.getService(id).subscribe({
    next: (res:any)=>{
      this.serviceGetId = res.service;
    },
    error: (err)=> alert(err.error.message)
  })
}

updateService(){
  this.serviceRest.updateService(this.serviceGetId._id, this.serviceGetId).subscribe({
    next: (res:any)=> {
      Swal.fire ({ icon: 'success', title: res.message,});
      this.getServices();
    },
    error: (err)=> {Swal.fire({icon: 'warning', title: err.error.message || err.error, });
    },
  })
}

deleteService(id:string){
  this.serviceRest.deleteService(id).subscribe({
    next: (res:any)=> {
      Swal.fire({
        title: res.message + ' ' + res.serviceDeleted.name,
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      });
      this.getServices();
    },
    error: (err)=> Swal.fire({
      title: err.error.message,
      icon: 'error',
      position: 'center',
      timer: 3000
    })
  })
}

}
