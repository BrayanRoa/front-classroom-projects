import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupData } from '../../interfaces/group-subject.interface';
import { GroupService } from '../../service/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/base/base.component';
import { PersonService } from '../../../persons/service/person.service';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/auth/service/login.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent extends BaseComponent {

  groups: GroupData[] = []
  teachers: any[] = [] //TODO: OJO CAMBIAR EL ANY

  subject!: string
  code!: string
  id!: string

  infoGroup!: FormGroup

  loading: boolean = true
  isVisible = false;
  person!: string
  role!:string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private readonly groupService: GroupService,
    private readonly personService: PersonService,
    private readonly authService: LoginService,
    private readonly aRoute: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    super()
    this.id = this.aRoute.snapshot.paramMap.get('id')!
    this.subject = this.aRoute.snapshot.paramMap.get('materia')!
    this.person = localStorage.getItem("email")!
    this.role = localStorage.getItem("role")!
    this.uploadGroupsOfSubject()
  }

  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled: true },
      { label: 'Todas', routerLink: "/dashboard/materias" },
      { label: `Grupos - ${this.subject}`, disabled: true }
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  chargeForm() {
    this.infoGroup = this.fb.group({
      name: ["", [Validators.required]],
      subject_code: [this.id, [Validators.required]],
      person: ["", [Validators.required]]
    })
  }

  validateFields(field: string) {
    return this.infoGroup.controls[field].errors &&
      this.infoGroup.controls[field].touched
  }

  uploadGroupsOfSubject() {
    this.groupService.uploadGroupOfSubject(this.id).subscribe({
      next: value => {
        this.subject = value.data.name
        this.code = value.data.code
        this.groups = value.data.group
        this.loading = false
      },
      error: err => {
        this.loading = false
      }
    })
  }

  registerGroupAndTeacher() {
    const { name, subject_code, person } = this.infoGroup.value
    this.groupService.createGroup(name, subject_code).subscribe({
      next: value => {
        this.personService.registerPersonInGroup(person, value.data.id).subscribe({
          next: value => {
            this.alertSuccess(value.data)
            this.infoGroup.reset()
            this.handleOk()
            this.teachers = []
          },
          error: err => {
            this.alertError(err.error.data)
          }
        })
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  enrollInGroup(id_group: string) {
    this.personService.seePerson(this.person).subscribe({
      next: person => {
        this.personService.registerPersonInGroup(person.data.id, id_group).subscribe({
          next: value => {
            this.alertSuccess(value.data)
          },
          error: err => {
            this.alertWarning(err.error.data)
          }
        })
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  showModal(): void {
    this.chargeForm()
    this.personService.uploadTeachers().subscribe(resp => {
      this.teachers = resp.data
    })
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.uploadGroupsOfSubject()
    this.infoGroup.reset()
    this.teachers = []
  }
  
  handleCancel(): void {
    this.isVisible = false;
    this.infoGroup.reset()
    this.teachers = []
  }
}
