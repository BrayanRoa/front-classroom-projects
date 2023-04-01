import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent extends BaseComponent{

  items!: MenuItem[];
  home!: MenuItem;

  group_id: string
  subject_name: string
  group_name: string

  formTask!: FormGroup;

  loading: boolean = true

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private taskService:TaskService,
    private router:Router
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.loadForm()
    this.loading = false
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Materias', disabled: true },
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" },
      { label: this.subject_name, routerLink: `/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Tareas', routerLink: `/dashboard/task/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Nueva Tarea', disabled: true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  loadForm() {
    this.formTask = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      expired_date: ["", [Validators.required]],
      group:[this.group_id, [Validators.required]]
    })
  }

  validateFields(field: string) {
    return this.formTask.controls[field].errors &&
      this.formTask.controls[field].touched
  }

  newTask() {
    this.taskService.newTask(this.formTask.value).subscribe({
      next: value =>{
        this.alertSuccess(value.data)
        this.router.navigateByUrl(`/dashboard/task/${this.subject_name}/${this.group_name}/${this.group_id}`)
      },
      error: e =>{
        this.alertError(e.error.data)
      }
    })
  }
}
