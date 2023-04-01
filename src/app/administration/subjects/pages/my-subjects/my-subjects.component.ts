import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupPersonService } from 'src/app/administration/group_person/service/group-person.service';
import { PersonService } from 'src/app/administration/persons/service/person.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import Swal from 'sweetalert2';
import { GroupElement } from '../../interfaces/my-subjects.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.css']
})
export class MySubjectsComponent extends BaseComponent{

  mySubjects: GroupElement[] = []

  person_id!: string
  loading = true;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService,
    private groupPersonService: GroupPersonService
  ) {
    super()
    this.uploadMySubjects()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled:true},
      { label: 'Mis Materias'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadMySubjects() {
    const email = localStorage.getItem("email")
    this.personService.uploadMySubjects(email!).subscribe({
      next: value => {
        this.mySubjects = value.data.groups
        this.person_id = value.data.id
        this.loading = false
      },
      error: err => {
        console.log(err);
      }
    })
  }

  cancel(group: string, state:string) {
    Swal.fire({
      icon: "warning",
      title: '¿Estas Seguro/a?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.groupPersonService.changeStateOfSubject(this.person_id, group, state).subscribe({
          next: value => {
            this.alertSuccess(value.data)
            this.uploadMySubjects()
          },
          error: err =>{
            this.alertError(err.error.data)
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
