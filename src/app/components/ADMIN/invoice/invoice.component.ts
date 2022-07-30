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

  invoices: any;

  id: any;

  constructor(
    private shoppingCartRest: ShoppingCartRestServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.invoice = new InvoiceModel('','','','','','','');
  }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.id = idRuta.get('id');
    });
    this.getInvoices();
    
  }
  getInvoices(){
    this.shoppingCartRest.getInvoices().subscribe({
      next: (res:any) => {
        for (let tour of res.invoices){
        
          for(let i = 0; i< tour.tours.length; i++){
            
            let x = Object.values(tour.tours[i]) 
            tour.tours[i] = x[1]
          
         }
  
  
        }
        this.invoices = res.invoices;
      console.log(res);
      
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  

}

