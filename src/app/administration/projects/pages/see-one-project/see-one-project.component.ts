import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/api';
import { ProjectService } from '../../service/project.service';
import { DataProject } from '../../interfaces/one-project.interface';
import { PersonService } from '../../../persons/service/person.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { PersonProject } from '../../interfaces/person_with_project.interface';
@Component({
  selector: 'app-see-one-project',
  templateUrl: './see-one-project.component.html',
  styleUrls: ['./see-one-project.component.css']
})
export class SeeOneProjectComponent extends BaseComponent {

  title: string = "Proyecto"

  subject_name!: string
  group_id!: string
  group_name!: string
  project_id!: string
  project!: DataProject
  persons!: PersonProject[]
  messages!: Message[]

  loading: boolean = true;
  // loading2: boolean = false;

  responsiveOptions!: any[];

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private aRoute: ActivatedRoute,
    private projectService: ProjectService,
    private personService: PersonService,
    private router: Router
  ) {
    super()
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group")!
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.project_id = this.aRoute.snapshot.paramMap.get("id")!
    this.findOneProject()
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  findOneProject() {
    this.projectService.findOneProject(this.project_id).subscribe({
      next: value => {
        this.project = value.data
        this.projectService.findProjectsWithPersons(this.project_id).subscribe({
          next: value => {
            this.persons = value.data
          },
          error: e => {
            this.messages = [{ severity: 'info', summary: 'Info', detail: `${e.error.data}` }]
          }
        })
        this.items = [
          { label: 'Materias', disabled: true },
          { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" },
          { label: this.subject_name, routerLink: `/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
          { label: 'Proyectos', routerLink: `/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}` },
          { label: `Proyecto - ${value.data.name}`, disabled: true }
        ]
        this.loading = false
      }
    })
  }

  signUp() {
    const email = localStorage.getItem("email")!
    this.personService.seePerson(email).subscribe({
      next: value => {
        this.personService.signUpInProject({
          person_id: value.data.id,
          project_id: this.project_id,
          state: true
        }).subscribe({
          next: value => {
            this.alertSuccess(value.data)
            this.router.navigateByUrl(`/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}`)
          },
          error: e => {
            this.alertError(e.error.data)
          }
        })
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

  approved() {
    this.projectService.changeState(this.project_id, "in progress").subscribe({
      next: value => {
        this.alertSuccess(value.data)
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }
}
