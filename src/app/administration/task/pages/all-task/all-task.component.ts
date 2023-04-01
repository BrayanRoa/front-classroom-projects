import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { TaskInterface } from '../../../groups/interfaces/all-task.interface';
import { BaseComponent } from '../../../../shared/base/base.component';
import { GroupService } from '../../../groups/service/group.service';


@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent extends BaseComponent {

  loading: boolean = true
  tasks!: TaskInterface[]

  group_id!: string
  subject_name!: string
  group_name!: string

  date!: Date

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private aRoute: ActivatedRoute,
    private groupService: GroupService
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.date = new Date()
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
    this.groupService.findAllTaskOfGroup(this.group_id).subscribe({
      next: value => {
        this.tasks = value.data.task
        this.tasks = this.tasks.map(m => {
          return {
            ...m,
            expired: (this.date > new Date(m.expired_date))?true:false
          }
        })
        this.loading = false
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
