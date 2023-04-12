import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ListSubjectsInterface } from "../../interfaces/all-subject.interface"
import { SubjectService } from '../../service/subject.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.css']
})
export class AllSubjectsComponent extends BaseComponent {

  subjects: ListSubjectsInterface[] = []
  loading = true;
  isVisible = false;
  role!:string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder
  ) {
    super()
    this.uploadsSubjects()
    this.role = localStorage.getItem("role")!
  }

  ngOnInit(): void {
    this.items = [
      { label: "Materias", disabled: true },
      { label: 'Todas' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadsSubjects() {
    this.subjectService.uploadSubjects().subscribe({
      next: (resp => {
        this.subjects = resp.data
        this.loading = false
      }),
      error: (e => {
        this.loading = false
      })
    })
  }

  infoSubject: FormGroup = this.fb.group({
    code: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    name: ["", [Validators.required, Validators.min(3)]]
  })

  validateFields(field: string) {
    return this.infoSubject.controls[field].errors &&
      this.infoSubject.controls[field].touched
  }

  register() {
    const { name, code } = this.infoSubject.value
    this.subjectService.register(code, name).subscribe({
      next: value => {
        this.alertSuccess(value.data)
        this.handleOk()
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.uploadsSubjects()
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
