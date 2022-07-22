import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TourModel } from 'src/app/models/tour.model';
import { TourRestService } from 'src/app/services/tourRestService/tour-rest.service';
import { PlaceRestService } from 'src/app/services/placeRest/place-rest.service'; 
import { ServiceRestService } from 'src/app/services/serviceRest/service-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {


  token: any;
  identity: any;
  role: any;

  //Variables Tour
  tours: any;
  tour: TourModel;
  searchTour: any;
  tourUpdate: any;
  idPlace: any;
  PlaceId: any;
  id: any
  places: any;
  services: any;
  search: any;
  place: any; 
  servicesString: any;

  constructor(
    private tourRest: TourRestService,
    private placeRest: PlaceRestService,
    private serviceRest: ServiceRestService,
    private userRest: UserRestService,
    private activatedRoute: ActivatedRoute

  ) { 
    this.tour = new TourModel ('', '', '', '', 0, 0, '', '');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idPlace = idRuta.get('idPlace');
    });

    this.getTourByPlace();
    this.getServices();

    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
  }

  getTours() {
    this.tourRest.getTours().subscribe({
      next: (res: any) =>{
      for (let tour of res.tours){
        
        for(let i = 0; i< tour.service.length; i++){
          
          let x = Object.values(tour.service[i]) 
          tour.service[i] = x[1]
        
       }


      }
        this.tours = res.tours
        console.log(this.tours);
      },
      
      error: (err) => console.log(err)
    })
  }

 

  getServices() {
    this.serviceRest.getServices().subscribe({
      next: (res: any) => this.services = res.services,
      error: (err) => console.log(err)
    })
  }

  saveTour(addTourForm: any) {
    this.tourRest.saveTour(this.idPlace ,this.tour).subscribe({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          this.getTourByPlace();
        addTourForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addTourForm.reset();
      },
    })
  }

  getTour(id: string) {
    this.tourRest.getTour(id).subscribe({
      next: (res: any) => {
        this.tourUpdate = res.tour;
      },
      error: (err) => alert(err.error.message)
    })
  }

  updateTour() {
    this.tourRest.updateTour(this.tourUpdate._id, this.tourUpdate).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success', title: res.message, });
        this.getTourByPlace();
      },
      error: (err) => Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  deleteTour(id: string) {
    this.tourRest.deleteTour(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message + ' ' + res.tourDeleted.name,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });
        this.getTourByPlace();
      },
      error: (err) => Swal.fire({
        title: err.error.message,
        icon: 'error',
        position: 'center',
        timer: 3000
      })
    })
  }

  getTourByPlace() {
    this.tourRest.getTourByPlace(this.idPlace).subscribe({
      next: (res: any) =>{
        for (let tour of res.tours){        
          for(let i = 0; i< tour.service.length; i++){   
            let a = ' '
            let x = Object.values(tour.service[i] ) 
            tour.service[i] = a + x[1]  
         }  
        }
          this.tours = res.tours
        },
      error: (err) => console.log(err)
    })
  }

  getProductsByStock() {
    this.tourRest.getexhaustedTour().subscribe({
      next: (res: any) => { this.tours = res.tours, console.log(this.tours) },
      error: (err) => console.log(err)
    })
  }



}
