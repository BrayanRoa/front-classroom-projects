import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TasksInterface } from '../../interfaces/all_task_projects.interface';
import { TaskService } from '../../service/task.service';
import { ListTaskGroup } from '../../interfaces/task_of_group.interface';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {

  items!: MenuItem[];
  home!: MenuItem;

  group_id!: string
  subject_name!: string
  group_name!: string

  tasks!:ListTaskGroup[]

  loading: boolean = true

  constructor(
    private readonly aRoute: ActivatedRoute,
    private readonly taskService:TaskService
  ) {
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.uploadTask()
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Materias', disabled: true },
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" },
      { label: this.subject_name, routerLink: `/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Tareas', disabled: true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadTask() {
    console.log(this.group_id);
    this.taskService.findAllTaskOfGroup(this.group_id).subscribe({
      next: value => {
        this.tasks = value.data
        this.loading = false
      },
      error: e => {
        this.loading = false
      }
    })
  }

}
