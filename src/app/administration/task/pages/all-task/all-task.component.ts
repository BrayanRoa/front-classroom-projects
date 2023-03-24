import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';
// import { TaskService } from '../../service/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../groups/interfaces/all-task.interface';
import { BaseComponent } from '../../../../shared/base/base.component';
import { GroupService } from '../../../groups/service/group.service';


@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent extends BaseComponent {

  loading:boolean = true

  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  tasks!:Task[]

  group_id!:string
  subject_name!:string
  group_name!:string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    // private taskService:TaskService,
    private aRoute:ActivatedRoute,
    private groupService:GroupService
  ){
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.uploadTask()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.items = [
      { label: 'Materias', disabled:true }, 
      { label: 'Mis Materias', routerLink:"/dashboard/mis_materias" }, 
      { label: this.subject_name, routerLink:`/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` }, 
      { label: 'Tareas', disabled:true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadTask(){
    this.groupService.findAllTaskOfGroup(this.group_id).subscribe({
      next: value =>{
        this.tasks = value.data.task
        this.dtTrigger.next(this.tasks)
        this.loading = false
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
