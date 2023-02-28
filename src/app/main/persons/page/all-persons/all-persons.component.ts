import { Component } from '@angular/core';
import { Persons } from '../../interfaces/person.interface';
import { PersonService } from '../../service/person.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-persons',
  templateUrl: './all-persons.component.html',
  styleUrls: ['./all-persons.component.css']
})
export class AllPersonsComponent {

  title: string = "Personas"
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
    this.personService.uploadPersons().subscribe({
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
