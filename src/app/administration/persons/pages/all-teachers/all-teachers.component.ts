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

  title: string = "Docentes"
  loading: boolean = true

  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  persons: PersonsInterface[] = []

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
      { label: 'Docentes'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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
        this.alertError(e.error.data)
      })
    })
  }
}
