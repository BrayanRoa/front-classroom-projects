import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { OnePersonsInterface } from '../../interfaces/one-person.interface';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-see-person',
  templateUrl: './see-person.component.html',
  styleUrls: ['./see-person.component.css']
})
export class SeePersonComponent extends BaseComponent {

  person!: OnePersonsInterface
  loading: boolean = true
  code: string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private readonly personService: PersonService,
    private aRoute: ActivatedRoute
  ) {
    super()
    this.code = this.aRoute.snapshot.paramMap.get('code') || ""
    this.uploadPerson(this.code)
  }

  uploadPerson(code: string) {
    this.personService.seePerson(code).subscribe({
      next: value => {
        const rol = (value.data.role.name === "docente") ? "Docente" : "Estudiante"
        this.person = value.data
        console.log(this.person);
        this.items = [
          { label: "Personas", disabled: true },
          { label: `${rol}`, routerLink: `/dashboard/${value.data.role.name}s` },
          {
            label: `${value.data.names} ${value.data.lastnames}`,
            disabled: true
          }];
        this.home = { icon: 'pi pi-home', routerLink: '/' };
        this.loading = false
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }
}
