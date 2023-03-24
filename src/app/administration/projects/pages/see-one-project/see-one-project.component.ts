import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProjectService } from '../../service/project.service';
import { DataProject } from '../../interfaces/one-project.interface';
@Component({
  selector: 'app-see-one-project',
  templateUrl: './see-one-project.component.html',
  styleUrls: ['./see-one-project.component.css']
})
export class SeeOneProjectComponent {

  title: string = "Proyecto"

  subject_name!: string
  group_id!: string
  group_name!: string
  project_id!: string
  project!: DataProject

  loading: boolean = true;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private aRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group")!
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.project_id = this.aRoute.snapshot.paramMap.get("id")!
    this.findOneProject()
  }

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  findOneProject() {
    this.projectService.findOneProject(this.project_id).subscribe({
      next: value => {
        this.project = value.data
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
}
