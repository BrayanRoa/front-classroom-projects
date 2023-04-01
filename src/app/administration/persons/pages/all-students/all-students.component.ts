import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonsInterface } from '../../interfaces/all-persons.interface';
import { PersonService } from '../../service/person.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent extends BaseComponent {
  title: string = "Estudiantes"

  persons: PersonsInterface[] = []
  loading = true;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService
  ) {
    super()
    this.uploadPersons()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Personas", disabled: true },
      { label: 'Estudiantes' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadPersons() {
    this.personService.uploadStudents("estudiante").subscribe({
      next: (resp => {
        this.persons = resp.data
        this.loading = false
      }),
      error: (e => {
        this.loading = false
        // this.alertError(e.error.data)
      })
    })
  }
}
