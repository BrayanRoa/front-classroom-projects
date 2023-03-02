import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent extends BaseComponent{
  isCollapsed = false;

  constructor(
    private router:Router
  ){
    super()
  }

  logOut(){
    Swal.fire({
      icon:"warning",
      title: '¿Estas Seguro/a?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
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
