import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryPlacesComponent } from './components/ADMIN/category-places/category-places.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlacesComponent } from './components/ADMIN/places/places.component'





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'category', component: CategoryPlacesComponent},
  {path: 'place/:idCategory', component: PlacesComponent},

  {path: '**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
