import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  token: string;
  identity: any;
  role: any;
  username: any;
  name: any;

  constructor(private userRest: UserRestService, private router: Router) {
    this.token = this.userRest.getToken();
  }

  userGetId: any;
  user: any;

  ngOnInit(): void {
    this.myProfile();
    this.token = this.userRest.getToken();
    this.identity = this.userRest.getIdentity();
    this.role = this.userRest.getIdentity().role;
    this.name = this.userRest.getIdentity().name;
  }

  myProfile() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.userGetId = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getUser() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateProfile() {
    this.userRest.updateProfile(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.myProfile();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  deleteProfile() {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
      confirmButtonColor: '#DC3311',
      denyButtonColor: '#118CDC',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRest.deleteProfile().subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            if(this.identity.role == 'CLIENT'){              
            localStorage.clear();
            this.router.navigateByUrl('/home');
            }else{
              this.router.navigateByUrl('/myProfile')
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'warning',
              title: err.error.message || err.error,
            });
          },
        });
      }
    });
  }


}
