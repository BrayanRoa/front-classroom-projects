import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonsInterface } from '../../interfaces/all-persons.interface';
import { PersonService } from '../../service/person.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent extends BaseComponent {

  persons: PersonsInterface[] = []
  loading: boolean = true

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
      { label: 'Docentes' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadPersons() {
    this.personService.uploadStudents("docente").subscribe({
      next: (resp => {
        this.persons = resp.data
        this.loading = false
      }),
      error: (e => {
        this.alertError(e.error.data)
      })
    })
  }
}
