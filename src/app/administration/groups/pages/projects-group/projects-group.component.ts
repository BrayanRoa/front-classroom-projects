import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GroupService } from '../../service/group.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';
import { ProjectInterface } from '../../interfaces/group-projects.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../projects/service/project.service';

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
  infoProject!: FormGroup

  loading: boolean = false
  isVisible: boolean = false


  constructor(
    private readonly groupService: GroupService,
    private readonly projectService:ProjectService,
    private readonly aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("group_id")!
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
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
