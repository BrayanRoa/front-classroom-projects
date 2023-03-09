import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Persons } from '../../interfaces/all-persons.interface';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent {

  title: string = "Docentes"
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  persons: Persons[] = []
  errors: string = ""
  loading = true;

  constructor(
    private personService: PersonService
  ) {
    this.uploadPersons()
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadPersons() {
    this.personService.uploadStudents("docente").subscribe({
      next: (resp => {
        this.persons = resp.data
        this.dtTrigger.next(this.persons)
        this.loading = false
      }),
      error: (e => {
        this.errors = e.error.data
      })
    })
  }
}
