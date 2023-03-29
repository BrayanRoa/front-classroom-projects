import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PersonService } from '../../../persons/service/person.service';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../shared/base/base.component';
import { DatumPerson } from '../../interfaces/all-persons-group.interface';

@Component({
  selector: 'app-persons-group',
  templateUrl: './persons-group.component.html',
  styleUrls: ['./persons-group.component.css']
})
export class PersonsGroupComponent extends BaseComponent {

  persons: DatumPerson[] = []
  loading = true;

  subject: string = ""
  group: string = ""
  id: string = ""
  isVisible = false;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService,
    private aRoute: ActivatedRoute,
  ) {
    super()
    this.id = this.aRoute.snapshot.paramMap.get("id")!
    this.subject = this.aRoute.snapshot.paramMap.get("subject")!
    this.group = this.aRoute.snapshot.paramMap.get("group")!
    this.uploadPersonsOfGroup()
  }


  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled:true},
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" }, 
      { label: `${this.subject}`, disabled:true }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadPersonsOfGroup() {
    this.personService.uploadPersonOfGroup(this.id).subscribe({
      next: (resp => {
        this.persons = resp.data
        this.loading = false
      }),
      error: (e => {
        this.alertError(e.error.data)
      })
    })
  }

  closeGroup(){
    this.alertWarning("¿Está seguro@ que desea cerrar el grupo? - Está acción es irreversible")
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
