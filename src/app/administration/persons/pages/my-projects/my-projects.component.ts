import { Component } from '@angular/core';
import { ListMyProjects } from '../../interfaces/my_projects.interface';
import { PersonService } from '../../service/person.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/auth/service/login.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent extends BaseComponent {

  projects!: ListMyProjects[]
  loading: boolean = true

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private personService: PersonService,
    private authService: LoginService
  ) {
    super()
    this.uploadMyProjects()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Proyectos", disabled: true },
      { label: 'Mis Proyectos', disabled: true }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadMyProjects() {
    const { email } = this.authService.auth
    this.personService.viewMyProjects(email!).subscribe({
      next: value => {
        console.log(value);
        this.projects = value.data.projects
        this.loading = false
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
