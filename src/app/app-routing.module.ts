import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryPlacesComponent } from './components/ADMIN/category-places/category-places.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlacesComponent } from './components/ADMIN/places/places.component'
import { ServicesComponent } from './components/service/service.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TourComponent } from './components/tour/tour.component';
import { InvoiceComponent} from './components/ADMIN/invoice/invoice.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { UsersComponent} from './components/ADMIN/users/users.component';







const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'category', component: CategoryPlacesComponent},
  {path: 'place/:idCategory', component: PlacesComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'shoppCart/:idTour', component: ShoppingCartComponent},
  {path: 'tour/:idPlace', component:TourComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'myProfile', component: MyProfileComponent},
  {path: 'users', component: UsersComponent},



  {path: '**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
