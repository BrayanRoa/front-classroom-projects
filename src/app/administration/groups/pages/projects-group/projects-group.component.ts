import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupService } from '../../service/group.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';
import { ProjectInterface } from '../../interfaces/group-projects.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../projects/service/project.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-projects-group',
  templateUrl: './projects-group.component.html',
  styleUrls: ['./projects-group.component.css']
})
export class ProjectsGroupComponent extends BaseComponent {
  

  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  projects: ProjectInterface[] = []

  title: string = "Proyectos"
  group_id!: string
  subject_name!:string
  group_name!:string
  infoProject!: FormGroup

  loading: boolean = true
  isVisible: boolean = false

  items!: MenuItem[];
  home!: MenuItem;

  selectedFile!: File;

  constructor(
    private readonly groupService: GroupService,
    private readonly projectService:ProjectService,
    private readonly aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.uploadProjectOfGroup()
    this.loadForm()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
    this.items = [
      { label: 'Materias', disabled:true }, 
      { label: 'Mis Materias', routerLink:"/dashboard/mis_materias" }, 
      { label: this.subject_name, routerLink:`/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` }, 
      { label: 'Proyectos', disabled:true }]
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  formTemplate:FormGroup = this.fb.group({
    template:["", [Validators.required]]
  })

  sendTemplate(event:any){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile);
  }

  loadForm() {
    this.infoProject = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      group: [this.group_id, [Validators.required]],
      number_of_students: [0, [Validators.required, Validators.min(1)]],
      state:["on hold", [Validators.required]]
    })
  }

  validateFields(field: string) {
    return this.infoProject.controls[field].errors &&
      this.infoProject.controls[field].touched
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadProjectOfGroup() {
    this.groupService.uploadProjectsOfGroup(this.group_id).subscribe({
      next: value => {
        this.projects = value.data.project
        this.dtTrigger.next(this.projects)
        this.loading = false
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  register() {
    this.projectService.create(this.infoProject.value).subscribe({
      next: value =>{
        this.alertSuccess(value.data)
        this.uploadProjectOfGroup()
        this.isVisible = false
      },
      error: err =>{
        this.alertError(err.error.data)
      }
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    const formData = new FormData();
    formData.append('archivo', this.selectedFile, this.selectedFile.name);
    this.projectService.uploadExcelOfProjects(this.group_id, formData).subscribe({
      next: value =>{
        this.alertSuccess(value.data)
        this.uploadProjectOfGroup()
      },
      error: e =>{
        this.alertError(e.error.data)
      }
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onBasicUploadAuto(event:any) {
    console.log(event);
  }
}
