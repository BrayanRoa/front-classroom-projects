import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupPersonService } from 'src/app/administration/group_person/service/group-person.service';
import { PersonService } from 'src/app/administration/persons/service/person.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import Swal from 'sweetalert2';
import { GroupElement } from '../../interfaces/my-subjects.interface';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.css']
})
export class MySubjectsComponent extends BaseComponent{

  title: string = "Mis Materias"
  mySubjects: GroupElement[] = []
  id: string = ""
  loading = true;
  person_id: string = ""


  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();


  constructor(
    private personService: PersonService,
    private groupPersonService: GroupPersonService
  ) {
    super()
    this.uploadMySubjects()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
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

  cancel(group: string) {
    Swal.fire({
      icon: "warning",
      title: '¿Estas Seguro/a?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.groupPersonService.changeStateOfSubject(this.person_id, group, "cancelled").subscribe({
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
