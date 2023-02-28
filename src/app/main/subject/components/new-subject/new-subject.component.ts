import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css']
})
export class NewSubjectComponent {


  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService
  ) { }

  infoSubject: FormGroup = this.fb.group({
    code: ["", Validators.required, Validators.minLength(7), Validators.maxLength(8)],
    name: ["", Validators.required, Validators.min(3)]
  })

  validateFields(field:string) {
    return this.infoSubject.controls[field].errors &&
      this.infoSubject.controls[field].touched
  }

  register() {
    const { name, code } = this.infoSubject.value
    this.subjectService.register(code, name).subscribe(resp => {

    })
  }
}
