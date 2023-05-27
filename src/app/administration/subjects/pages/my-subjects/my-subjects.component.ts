import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupPersonService } from 'src/app/administration/group_person/service/group-person.service';
import { PersonService } from 'src/app/administration/persons/service/person.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import Swal from 'sweetalert2';
import { GroupElement } from '../../interfaces/my-subjects.interface';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/auth/service/login.service';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.css']
})
export class MySubjectsComponent extends BaseComponent {

  mySubjects: GroupElement[] = []

  person_id!: string
  loading = true;
  isVisible : boolean = false;

  projectGroup: any[] = [];

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService,
    private groupPersonService: GroupPersonService,
    private subjectService: SubjectService,
    private readonly authService: LoginService
  ) {
    super()
    this.uploadMySubjects()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled: true },
      { label: 'Mis Materias' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  showModal(datos: string): void {
    this.isVisible = true;
    this.students(datos);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  students(datos:string){
    this.subjectService.Students(datos).subscribe({
      next: value => {
         this.alertSuccess(value.data)
         this.projectGroup = value
         console.log(value)
       },
       error: e => {
         this.alertError(e.error.data)
       }
    })
  }

  uploadMySubjects() {
    const email = localStorage.getItem("email")
    this.personService.uploadMySubjects(email!).subscribe({
      next: value => {
        this.mySubjects = value.data.groups
        if(this.mySubjects.length !== 0){
          this.person_id = value.data.id
        }
        this.loading = false
      },
      error: err => {
        console.log(err);
      }
    })
  }

  cancel(group: string, state: string) {
    Swal.fire({
      icon: "warning",
      title: '¿Estas Seguro/a que deseas cancelar la materia?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupPersonService.changeStateOfSubject(this.person_id, group, state).subscribe({
          next: value => {
            this.alertSuccess(value.data)
            this.uploadMySubjects()
          },
          error: err => {
            this.alertError(err.error.data)
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
