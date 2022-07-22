import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ShoppingCartRestServiceService } from 'src/app/services/shoppingCartRestService/shopping-cart-rest-service.service';
import { ShoppingCartModel } from 'src/app/models/shoppingCart.model';
import { TourRestService } from 'src/app/services/tourRestService/tour-rest.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  tourUpdate: any;
  shoppingCart: ShoppingCartModel;
  shoppCart: any;
  shoppCartPlace: any;
  shoppingGetId: any;
  tours: any;
  tour: any;
  idTour: any = '';
  quantity: number = 0;



  constructor(
    private shoppingRest: ShoppingCartRestServiceService,
    private tourRest: TourRestService,
    public activatedRoute: ActivatedRoute

  ){
    this.shoppingCart = new ShoppingCartModel("", 0, 0);
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( ruta => {
      this.idTour = ruta.get('idTour');
    });
    this.getTour();
  }

  getTour() {
    this.tourRest.getTour(this.idTour).subscribe({
      next: (res: any) => { 
          let tour = res.tour 
          for(let i = 0; i< tour.service.length; i++){   
            let a = ' '
            let x = Object.values(tour.service[i] ) 
            tour.service[i] = a + x[1]    
        }
          this.tours = res.tour
        },
      error: (err) => alert(err.error.message)
    })
  }

  myShopping() {
    this.shoppingRest.myShopping().subscribe({
      next: (res: any) => {
        this.shoppingGetId = res.shoppingCartPreview,
        console.log( this.shoppingGetId);
        
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  addToShoppingCart(){
    let addTour = {
      tour: this.idTour,
      quantity: this.quantity
    }
    this.shoppingRest.addToShoppingCart(addTour).subscribe({
      next: (res:any) =>{
           
        this.shoppCart = res.shoppingCart || res.pushTour

        console.log(this.shoppCart);
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        }); 
        
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });  
      },
    })
  }

  getTours(){
    this.shoppingRest.getTours().subscribe({
      next: (res: any) =>  this.tours = res.tours,
        error: (err) => console.log(err)
    });
  }

}
