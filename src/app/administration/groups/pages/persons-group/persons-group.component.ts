import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PersonService } from '../../../persons/service/person.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-persons-group',
  templateUrl: './persons-group.component.html',
  styleUrls: ['./persons-group.component.css']
})
export class PersonsGroupComponent {
  title: string = "Personas"
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  persons: any[] = [] //* TODO: 👀 QUITAR EL ANY
  loading = true;
  id: string = ""
  subject: string = ""
  group: string = ""
  isVisible = false;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService,
    private aRoute: ActivatedRoute,
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
    this.items = [
      { label: "Materias", disabled:true},
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" }, 
      { label: `${this.subject}`, disabled:true }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
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
      })
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
