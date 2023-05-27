import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';
import { GroupData } from '../../../groups/interfaces/group-subject.interface';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent extends BaseComponent {

  title: string = ""
  loading: boolean = true
  formProject!: FormGroup
  group_id!: string
  group_name!:string
  subject_name!:string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router:Router
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.group_name = this.aRoute.snapshot.paramMap.get("group_name")!
    this.loadForm()
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Materias', disabled:true },
      { label: 'Mis Materias', routerLink:"/dashboard/mis_materias" },
      { label: this.subject_name, routerLink:`/dashboard/personas/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Proyectos', routerLink:`/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}` },
      { label: 'Nuevo Proyecto', disabled:true }
    ],
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  loadForm() {
    this.formProject = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      numberOfStudents: [0, [Validators.required, Validators.min(1)]],
      state: ["in progress", Validators.required],
      grupo: [this.group_id, Validators.required],
      semestre: [0, [Validators.required, Validators.min(1)]],
      fecha_inicio: ["", [Validators.required]],
      fecha_finalizacion: ["", [Validators.required]],
    })
    this.loading = false
  }

  validateFields(field: string) {
    return this.formProject.controls[field].errors &&
      this.formProject.controls[field].touched
  }

  newProject() {
    const parsedFormProject = {...this.formProject.value};
    parsedFormProject.grupo = {id: parsedFormProject.grupo};

    this.projectService.create(parsedFormProject).subscribe({
      next: value => {
        this.alertSuccess(value.data)
        this.router.navigateByUrl(`/dashboard/proyectos/${this.subject_name}/${this.group_name}/${this.group_id}`)
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
