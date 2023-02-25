import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ResponseHttp } from '../../../../shared/interfaces/response.interface';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  errors: string = ""

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  formLogin: FormGroup = this.fb.group({
    email: ["@ufps.edu.co", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  })

  validateFields(field: string) {
    return this.formLogin.controls[field].errors &&
      this.formLogin.controls[field].touched
  }

  getInto() {

    const { email, password } = this.formLogin.value

    this.loginService.login(email, password).subscribe({
      next: value => {this.router.navigateByUrl("/dashboard/personas")},
      error: err => {this.errors = err.error.data}
    });
  }
}
