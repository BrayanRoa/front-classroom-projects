import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent extends BaseComponent{
  isCollapsed = false;
  mail!:string

  constructor(
    private router:Router
  ){
    super()
    this.mail = localStorage.getItem("email")!
  }

  logOut(){
    Swal.fire({
      icon:"warning",
      title: '¿Estas Seguro/a?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        this.router.navigateByUrl("/auth/login")
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
