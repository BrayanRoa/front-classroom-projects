import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';
import { TaskService } from '../../service/task.service';
import { TasksInterface } from '../../interfaces/all_task_projects.interface';


@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent extends BaseComponent {

  loading: boolean = true
  tasks!: TasksInterface[]

  group_id!: string
  subject_name!: string
  group_name!: string
  project_id!: string

  // date!: Date

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private aRoute: ActivatedRoute,
    private taskService: TaskService
    // private groupService: GroupService
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.project_id = this.aRoute.snapshot.paramMap.get("project_id")!
    // this.date = new Date()
    this.uploadTask()
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Materias', disabled: true },
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" },
      { label: this.subject_name, routerLink: `/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Proyectos', routerLink: `/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Tareas', disabled: true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadTask() {
    this.taskService.findAllTaskOfProject(this.group_id, this.project_id).subscribe({
      next: value => {
        this.tasks = value.data
        this.loading = false
      },
      error: e => {
        this.loading = false
        // this.alertError(e.error.data)
      }
    })
  }

}
