import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { OnePersonsInterface } from '../../interfaces/one-person.interface';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-see-person',
  templateUrl: './see-person.component.html',
  styleUrls: ['./see-person.component.css']
})
export class SeePersonComponent extends BaseComponent {

  title:string = ""
  person!:OnePersonsInterface
  loading:boolean = false
  code:string

  constructor(
    private readonly personService:PersonService,
    private aRoute:ActivatedRoute
  ){
    super()
    this.code = this.aRoute.snapshot.paramMap.get('code') || ""
    this.uploadPerson(this.code)
  }

  uploadPerson(code:string){
    this.personService.seePerson(code).subscribe({
      next: value =>{
        this.title = value.data.institutional_mail
        this.person = value.data
      },
      error: err =>{
        this.alertError(err.error.data)
      }
    })
  }
}
