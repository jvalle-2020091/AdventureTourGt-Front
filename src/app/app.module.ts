import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe'; 



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlacesComponent } from './components/ADMIN/places/places.component';
import { CategoryPlacesComponent } from './components/ADMIN/category-places/category-places.component';
import { UsersComponent } from './components/ADMIN/users/users.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ServicesComponent } from './components/service/service.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TourComponent } from './components/tour/tour.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    PlacesComponent,
    CategoryPlacesComponent,
    UsersComponent,
    MyProfileComponent,
    ServicesComponent,
    ShoppingCartComponent,
    TourComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
