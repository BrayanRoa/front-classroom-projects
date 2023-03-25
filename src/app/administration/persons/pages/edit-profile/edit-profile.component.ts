import { Component } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { OnePersonsInterface } from '../../interfaces/one-person.interface';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends BaseComponent{

  title:string = ""
  person!:OnePersonsInterface
  loading:boolean = false
  mail:string

  items!: MenuItem[];
  home!: MenuItem;

  constructor(
    private readonly personService:PersonService,
    private aRoute:ActivatedRoute
  ){
    super()
    this.mail = this.aRoute.snapshot.paramMap.get('mail')!
    this.uploadPerson(this.mail)
  }

  ngOnInit(): void {
    this.items = [
      { label: "Personas", disabled:true},
      { label: 'Editar Mi Perfil', disabled:true}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadPerson(mail:string){
    this.personService.seePerson(mail).subscribe({
      next: value =>{
        console.log(value);
        this.title = value.data.institutional_mail
        this.person = value.data
      },
      error: err =>{
        this.alertError(err.error.data)
      }
    })
  }
}
