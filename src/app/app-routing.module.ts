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
import { UsersGuard } from './guards/users.guard';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'category', canActivate:[UsersGuard], component: CategoryPlacesComponent},
  {path: 'place/:idCategory', canActivate:[UsersGuard], component: PlacesComponent},
  {path: 'services', canActivate:[UsersGuard], component: ServicesComponent},
  {path: 'shoppCart/:idTour', canActivate:[ClientGuard], component: ShoppingCartComponent},
  {path: 'tour/:idPlace', canActivate:[UsersGuard], component:TourComponent},
  {path: 'invoices', canActivate:[AdminGuard], component: InvoiceComponent},
  {path: 'myProfile', canActivate:[UsersGuard], component: MyProfileComponent},
  {path: 'users', canActivate:[AdminGuard], component: UsersComponent},

  {path: '**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
