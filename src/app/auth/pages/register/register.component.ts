import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../../administration/document/service/document.service';
import { DocumentsData } from '../../../administration/document/interfaces/document.interface';
import { RoleService } from '../../../administration/role/service/role.service';
import { RoleData } from '../../../administration/role/interface/role.interface';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../shared/base/base.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs';
import { PersonService } from 'src/app/administration/persons/service/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {

  document_types: DocumentsData[] = []
  role: RoleData[] = []
  registerForm!:FormGroup

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private roleService: RoleService,
    private personService: PersonService,
    private router: Router,
    private message: NzMessageService
  ) {
    super()
    this.uploadData()
    this.loadForm()
  }

  loadForm(){
    this.registerForm = this.fb.group({
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
  }

  validateFields(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }
  
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

  register() {
    this.personService.registerPerson(this.registerForm.value).subscribe({
      next: value => {
        this.createBasicMessage()
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  createBasicMessage(): void {
    this.message
      .loading('Registrando Persona', { nzDuration: 2500 })
      .onClose!.pipe(concatMap(() =>
        this.message.success('Persona Registrada Con Exito', { nzDuration: 1000 }).onClose!),
      )
      .subscribe(() => {
        this.router.navigateByUrl("/auth/login")
      });
  }
}
