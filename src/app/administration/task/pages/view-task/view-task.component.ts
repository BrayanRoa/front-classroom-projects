import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TaskService } from '../../service/task.service';
import { taskInterface } from '../../interfaces/view-task.interface';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent extends BaseComponent {

  loading: boolean = true
  isVisible: boolean = false

  task!: taskInterface
  idTask!: string
  // deliveryForm!: FormGroup

  items!: MenuItem[];
  home!: MenuItem;

  selectedFile!: File;

  constructor(
    private taskService: TaskService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super()
    this.idTask = this.aRoute.snapshot.paramMap.get("task_id")!
    this.viewTask()
  }

  // TODO: ACOMODAR
  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled: true },
      { label: 'Todas', routerLink: "/dashboard/materias" },
      // { label: `Grupos - ${this.subject}`, disabled: true }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  // loadForm() {
    deliveryForm:FormGroup = this.fb.group({
      file: ["", Validators.required]
    })
  // }

  sendTemplate(event:any){
    this.selectedFile=event.target.files[0];
  }

  viewTask() {
    this.taskService.viewTask(this.idTask).subscribe({
      next: value => {
        this.task = value.data
        this.loading = false
      },
      error: e => {
        // TODO: SI DA ERROR VOLVER A LA PÁGINA INMEDIATAMENTE ANTERIOR
        this.alertError(e.error.data)
      }
    })
  }

  showModal(): void {
    this.isVisible = true;
    // this.loadForm()
  }

  handleOk(): void {
    this.isVisible = false;
    // const formData = new FormData();
    // formData.append('archivo', this.selectedFile, this.selectedFile.name);
    // this.projectService.uploadExcelOfProjects(this.group_id, formData).subscribe({
    //   next: value =>{
    //     this.alertSuccess(value.data)
    //     this.uploadProjectOfGroup()
    //   },
    //   error: e =>{
    //     this.alertError(e.error.data)
    //   }
    // })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
