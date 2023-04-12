import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import Swal from 'sweetalert2';
import { PersonService } from '../persons/service/person.service';
import { LoginService } from 'src/app/auth/service/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent extends BaseComponent{
  isCollapsed = false;
  mail!:string
  namePerson!:string
  img!:string

  constructor(
    private router:Router,
    private personService:PersonService,
    private readonly authService:LoginService
  ){
    super()
    this.mail = localStorage.getItem("email")!
    // this.mail = this.authService.auth.email!
    this.infoPerson()
  }

  infoPerson(){
    this.personService.seePerson(this.mail).subscribe({
      next: value =>{
        console.log(value);
        this.namePerson = `${value.data.names} ${value.data.lastnames}`
        this.img = (value.data.img)?value.data.img:this.img_default
      }
    })
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
