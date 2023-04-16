import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OneTaskProject } from '../../interfaces/view-task.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent extends BaseComponent {

  loading: boolean = true
  isVisible: boolean = false
  chargeFile: boolean = false

  task!: OneTaskProject
  task_id!: string
  task_date!: Date
  dateCurrent!: Date

  subject_name: string
  group_name!: string
  group_id!: string

  project_id!: string
  role!: string

  items!: MenuItem[];
  home!: MenuItem;

  selectedFile!: File;

  constructor(
    private taskService: TaskService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    super()
    this.task_id = this.aRoute.snapshot.paramMap.get("task_id")!
    this.project_id = this.aRoute.snapshot.paramMap.get("project_id")!
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.role = localStorage.getItem("role")!
    this.dateCurrent = new Date();
    this.viewTask()
  }

  deliveryForm: FormGroup = this.fb.group({
    file: ["", Validators.required]
  })

  sendTemplate(event: any) {
    this.selectedFile = event.target.files[0];
  }

  viewTask() {
    this.taskService.viewTask(this.project_id, this.task_id).subscribe({
      next: value => {
        this.task = value.data
        this.loading = false
        this.task_date = new Date(this.task.task.expired_date)
        this.loadBreadcrum()
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.chargeFile = true
    const formData = new FormData();
    formData.append('archivo', this.selectedFile, this.selectedFile.name);
    this.taskService.addDelivery(this.task.id, formData).subscribe({
      next: value => {
        this.alertSuccess(value.data)
        this.chargeFile = false
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  downloadDelivery() {
    if (!this.task.link) {
      this.alertWarning("The team has not delivered yet")
    } else {
      this.http.get(this.task.link, { responseType: 'blob' }).subscribe((res: any) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(res);
        a.href = objectUrl;
        a.download = `${this.task.project.name}-${this.task.task.name}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }
  }

  loadBreadcrum(){
    this.items = [
      { label: 'Materias', disabled: true },
      { label: 'Mis Materias', routerLink: "/dashboard/mis_materias" },
      { label: this.subject_name, routerLink: `/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Proyectos', routerLink: `/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Tareas', routerLink: `/dashboard/task/${this.subject_name}/${this.group_name}/${this.group_id}/${this.project_id}` },
      { label: `Tarea - ${this.task.task.name}`, disabled: true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

}
