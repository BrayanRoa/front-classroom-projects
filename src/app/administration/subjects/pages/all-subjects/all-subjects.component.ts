import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { SubjectData } from "../../interfaces/all-subject.interface"
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrls: ['./all-subjects.component.css']
})
export class AllSubjectsComponent extends BaseComponent {

  title: string = "Materias"
  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();
  subjects: SubjectData[] = []
  errors: string = ""
  loading = true;
  isVisible = false;

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,

  ) {
    super()
    this.uploadsSubjects()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  uploadsSubjects() {
    this.subjectService.uploadSubjects().subscribe({
      next: (resp => {
        this.subjects = resp.data
        this.dtTrigger.next(this.subjects)
        this.loading = false
      }),
      error: (e => {
        this.loading = false
        this.errors = e.error.data
      })
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
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
