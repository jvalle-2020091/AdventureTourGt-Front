import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartRestServiceService } from 'src/app/services/shoppingCartRestService/shopping-cart-rest-service.service'
import { Router } from '@angular/router';
import {InvoiceModel} from 'src/app/models/invoice.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: InvoiceModel;
  invoiceId: any;
  shoppingCart: any;
  shoppingGetId: any;
  invoiceTour: any;

  id: any;

  constructor(
    private ShoppingCartRest: ShoppingCartRestServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.invoice = new InvoiceModel('','','','','','','');
  }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.id = idRuta.get('id');
    });

  }

  addInvoice(){
    this.ShoppingCartRest.addInvoice(   this.invoice).subscribe({
      next: (res: any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        });

        console.log(res);
        
        this.invoiceTour = res.updateInvoice ;
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

}

