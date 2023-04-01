import { Component } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { OnePersonsInterface } from '../../interfaces/one-person.interface';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends BaseComponent {

  person!: OnePersonsInterface
  loading: boolean = true
  mail: string
  isVisible: boolean = false

  selectedFile!: File;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private readonly personService: PersonService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super()
    this.mail = this.aRoute.snapshot.paramMap.get('mail')!
    this.uploadPerson(this.mail)
  }

  ngOnInit(): void {
    this.items = [
      { label: "Personas", disabled: true },
      { label: 'Editar Mi Perfil', disabled: true }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadPerson(mail: string) {
    this.personService.seePerson(mail).subscribe({
      next: value => {
        console.log(value);
        this.person = value.data
        this.loading = false
      },
      error: err => {
        this.alertError(err.error.data)
      }
    })
  }

  formTemplate: FormGroup = this.fb.group({
    template: ["", [Validators.required]]
  })

  sendTemplate(event: any) {
    this.selectedFile = event.target.files[0];
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    const formData = new FormData();
    formData.append('archivo', this.selectedFile, this.selectedFile.name);
    this.personService.uploadImgProfile(this.person.id, formData).subscribe({
      next: value => {
        this.alertSuccess(value.data)
        this.uploadPerson(this.mail)
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  changeProfilePicture() {
    // this.personService
  }
}
