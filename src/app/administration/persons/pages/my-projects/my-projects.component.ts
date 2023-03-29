import { Component } from '@angular/core';
import { ViewMyProjects } from '../../interfaces/my_projects.interface';
import { PersonService } from '../../service/person.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent extends BaseComponent {

  projects!: ViewMyProjects
  loading:boolean = true

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService
  ) {
    super()
    this.uploadMyProjects()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Proyectos", disabled: true },
      { label: 'Mis Proyectos',  disabled: true}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadMyProjects() {
    this.personService.viewMyProjects(localStorage.getItem("email")!).subscribe({
      next: value => {
        this.projects = value
        this.loading = false
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
