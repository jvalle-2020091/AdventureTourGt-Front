import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserRestService } from '../services/userRest/user-rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userRest: UserRestService,
    public router: Router
  ) { }

  canActivate() {
    if (this.userRest.getIdentity().role === 'ADMIN'  ) {
      return true
    } else {
      this.router.navigateByUrl('home');
      return false;
    }
  }
  
}
