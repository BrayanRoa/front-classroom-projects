import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PersonService } from '../../../persons/service/person.service';

@Component({
  selector: 'app-persons-group',
  templateUrl: './persons-group.component.html',
  styleUrls: ['./persons-group.component.css']
})
export class PersonsGroupComponent {
  title: string = "Personas"
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  persons: any[] = []
  errors: string = ""
  loading = true;
  id: string = ""
  subject: string = ""
  group: string = ""

  constructor(
    private personService: PersonService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get("id")!
    this.subject = this.aRoute.snapshot.paramMap.get("subject")!
    this.group = this.aRoute.snapshot.paramMap.get("group")!
    this.uploadPersonsOfGroup()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadPersonsOfGroup() {
    this.personService.uploadPersonOfGroup(this.id).subscribe({
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
