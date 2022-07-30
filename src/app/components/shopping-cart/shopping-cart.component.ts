import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { InvoiceModel } from 'src/app/models/invoice.model';
import { ShoppingCartRestServiceService } from 'src/app/services/shoppingCartRestService/shopping-cart-rest-service.service';
import { ShoppingCartModel } from 'src/app/models/shoppingCart.model';
import { TourRestService } from 'src/app/services/tourRestService/tour-rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy{
  tourUpdate: any;
  shoppingCart: ShoppingCartModel;
  shoppCart: any;
  shoppCartPlace: any;
  shoppingGetId: any;
  tours: any;
  tour: any;
  idTour: any = '';
  quantity: number = 0;
  invoice: InvoiceModel;
  idShopp: any;
  invoiceId: any;

  tourRes: any;
  tourQuantity: any;
  tourSubTotal: any;

  invoiceRes: any;

  constructor(
    private shoppingRest: ShoppingCartRestServiceService,
    private tourRest: TourRestService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.shoppingCart = new ShoppingCartModel('', 0, 0, '');
    this.invoice = new InvoiceModel('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((ruta) => {
      this.idTour = ruta.get('idTour');
    });
    this.getTour();
  }

  ngOnDestroy(): void {
    console.log('OnDestroy on');
  }

  getTour() {
    this.tourRest.getTour(this.idTour).subscribe({
      next: (res: any) => {
        let tour = res.tour;
        for (let i = 0; i < tour.service.length; i++) {
          let a = ' ';
          let x = Object.values(tour.service[i]);
          tour.service[i] = a + x[1];
        }
        this.tours = res.tour;
      },
      error: (err) => alert(err.error.message),
    });
  }

  addToShoppingCart() {
    let addTour = {
      tour: this.idTour,
      quantity: this.quantity,
    };
    this.shoppingRest.addToShoppingCart(addTour).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        });
        this.shoppCart = res.shoppingCart || res.pushTour;
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C',
        });
      },
    });
  }

  getTours() {
    this.shoppingRest.getTours().subscribe({
      next: (res: any) => (this.tours = res.tours),
      error: (err) => console.log(err),
    });
  }

  addInvoice(addInvoiceForm: any) {
    this.shoppingRest.addInvoice(this.invoice).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        });

        this.invoiceRes = res.updateInvoice;
        this.tourRes = res.tour;
        this.tourQuantity = res.tourQuantity;
        this.tourSubTotal = res.tourSubTotal;
        addInvoiceForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C',
        });
        addInvoiceForm.reset();
      },
    });
  }

  cleanShoppCart() {
    this.shoppingRest.cleanShoppCart().subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: (err) =>
        Swal.fire({
          title: err.error.message,
          icon: 'error',
          position: 'center',
          timer: 3000,
        }),
    });
  }

  refresh(): void {
    window.location.reload();
}

  deleteTour(id: string) {
    this.shoppingRest.deleteTour(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: (err) =>
        Swal.fire({
          title: err.error.message,
          icon: 'error',
          position: 'center',
          timer: 3000,
        }),
    });
  }
}
