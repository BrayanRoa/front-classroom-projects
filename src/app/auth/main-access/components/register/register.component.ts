import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../../../main/document/service/document.service';
import { DocumentsData } from '../../../../main/document/interfaces/document.interface';
import { RoleService } from '../../../../main/role/service/role.service';
import { RoleData } from '../../../../main/role/interface/role.interface';
import { PersonService } from '../../../../main/persons/service/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errors: string = ""
  document_types: DocumentsData[] = []
  role: RoleData[] = []

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private roleService: RoleService,
    private personService: PersonService,
    private router: Router
  ) {
    this.uploadData()
  }


  registerForm: FormGroup = this.fb.group({
    names: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)]],
    lastnames: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)]],
    institutional_mail: ["@ufps.edu.co", [
      Validators.required,
      this.validateEmail]],
    password: ["", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)]],
    code: ["", [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7)
    ]],
    document_id: ["", [
      Validators.required
    ]],
    num_document: ["", [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(12)
    ]],
    role_id: ["", [Validators.required]]
  })

  uploadData() {
    this.documentService.getAll().subscribe(resp => {
      this.document_types = resp.data
    })
    this.roleService.uploadRoles().subscribe(resp => {
      this.role = resp.data
    })
  }

  validateEmail(c: FormControl) {
    const email = c.value;
    if (!email || email.endsWith('@ufps.edu.co')) {
      return null; // correo válido
    } else {
      return { invalidEmail: true }; // correo inválido
    }
  }

  validateFields(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  register() {
    this.personService.registerPerson(this.registerForm.value).subscribe({
      next: value => { this.router.navigateByUrl("/auth/login") },
      error: err => { this.errors = err.error.data }
    })
  }
}
