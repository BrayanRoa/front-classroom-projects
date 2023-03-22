import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

import { BaseComponent } from '../../../shared/base/base.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent extends BaseComponent {

  formLogin!: FormGroup

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private message: NzMessageService
  ) {
    super()
    this.loadForm()
  }

  loadForm() {
    this.formLogin = this.fb.group({
      email: ["@ufps.edu.co", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  validateFields(field: string) {
    return this.formLogin.controls[field].errors &&
      this.formLogin.controls[field].touched
  }

  getInto() {

    const { email, password } = this.formLogin.value

    this.loginService.login(email, password).subscribe({
      next: value => {
        this.createBasicMessage()
      },
      error: err => {
        this.alertError(err.error.data)
      }
    });
  }

  createBasicMessage(): void {
    this.message
      .loading('Ingresando...', { nzDuration: 1000 })
      .onClose!.pipe(concatMap(() =>
        this.message.success('Login Exitoso!!!', { nzDuration: 1000 }).onClose!),
      )
      .subscribe(() => {
        this.router.navigateByUrl("/dashboard/estudiantes")
      });
  }

}
