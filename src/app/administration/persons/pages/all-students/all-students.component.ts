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
export class AllStudentsComponent extends BaseComponent{
  title: string = "Estudiantes"

  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };

    this.items = [
      { label: "Personas", disabled:true},
      { label: 'Estudiantes'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadPersons() {
    this.personService.uploadStudents("estudiante").subscribe({
      next: (resp => {
        this.persons = resp.data
        this.dtTrigger.next(this.persons)
        this.loading = false
      }),
      error: (e => {
        this.alertError(e.error.data)
      })
    })
  }
}
