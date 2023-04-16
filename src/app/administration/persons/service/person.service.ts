import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MySubjectInterface } from '../../subjects/interfaces/my-subjects.interface';
import { GetAllPersonsInterface, PersonsInterface } from '../interfaces/all-persons.interface';
import { ResponseHttp } from '../../../shared/interfaces/response.interface';
import { GetOnePersonsInterface } from '../interfaces/one-person.interface';
import { AllPersonGroupInterface } from '../../groups/interfaces/all-persons-group.interface';
import { SignInPersonInProject } from '../interfaces/signIn-Person-project.interface';
import { ViewMyProjects } from '../interfaces/my_projects.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private URL: string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  registerPerson(body:ResponseHttp):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/person/create`, body)
  }

  registerPersonInGroup(person:string, group:string): Observable<ResponseHttp>{
    const state = "in progress"
    console.log(person, group, state);
    return this.http.post<ResponseHttp>(`${this.URL}/group_person/create`,{person, group, state})
  }

  uploadStudents(role:string):Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/person/${role}/all`)
  }

  uploadTeachers():Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/person/docente/all`)
  }

  uploadMySubjects(email:string):Observable<MySubjectInterface>{
    return this.http.get<MySubjectInterface>(`${this.URL}/person/subjects/${email}`)
  }

  seePerson(term:string):Observable<GetOnePersonsInterface>{
    return this.http.get<GetOnePersonsInterface>(`${this.URL}/person/${term}`)
  }

  uploadPersonOfGroup(id:string):Observable<AllPersonGroupInterface>{
    return this.http.get<AllPersonGroupInterface>(`${this.URL}/persons/group/${id}`)
  }

  signUpInProject(body:SignInPersonInProject):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/project_person/create`, body)
  }

  viewMyProjects(mail:string):Observable<ViewMyProjects>{
    return this.http.get<ViewMyProjects>(`${this.URL}/person/my_projects/${mail}`)
  }

  uploadImgProfile(id:string, file:any):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/person/image/${id}`, file)
  }
}
