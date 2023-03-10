import { Component } from '@angular/core';
import { PersonsInterface } from '../../interfaces/all-persons.interface';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent {

  title: string = "Docentes"
  persons: PersonsInterface[] = []
  errors: string = ""
  loading = true;

  constructor(
    private personService: PersonService
  ) {
    this.uploadPersons()
  }


  uploadPersons() {
    this.personService.uploadStudents("docente").subscribe({
      next: (resp => {
        this.persons = resp.data
        this.loading = false
      }),
      error: (e => {
        this.errors = e.error.data
      })
    })
  }
}
