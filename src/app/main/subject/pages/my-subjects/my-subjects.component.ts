import { Component } from '@angular/core';
import { PersonService } from '../../../persons/service/person.service';
import { ActivatedRoute } from '@angular/router';
import { GroupElement } from '../../interfaces/my-subjects.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.css']
})
export class MySubjectsComponent {

  title:string = "Mis Materias"
  mySubjects:GroupElement[]=[]
  id:string = ""
  loading = true;


  dtOptions: DataTables.Settings = {}
  dtTrigger = new Subject<any>();


  constructor(
    private personService:PersonService,
    private aRoute:ActivatedRoute
  ){
    this.uploadMySubjects()
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json"
      }
    };
  }

  uploadMySubjects(){
    const email = localStorage.getItem("email")
    this.personService.uploadMySubjects(email!).subscribe({
      next: value =>{
        this.mySubjects = value.data.groups
        this.loading = false
      },
      error: err =>{
        console.log(err);
      }
    })
  }
}
