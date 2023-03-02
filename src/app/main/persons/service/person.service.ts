import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../../../shared/interfaces/response.interface';
import { MySubjectInterface } from '../../subject/interfaces/my-subjects.interface';
import { GetAllPersonsInterface, RegisterPerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private URL: string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  registerPerson(body:RegisterPerson):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/person/create`, body)
  }

  registerPersonInGroup(person:string, group:string): Observable<ResponseHttp>{
    const state = "in progress"
    return this.http.post<ResponseHttp>(`${this.URL}/group_person/create`,{person, group, state})
  }

  uploadPersons():Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/persons`)
  }

  uploadTeachers():Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/person/docente/all`)
  }

  uploadMySubjects(email:string):Observable<MySubjectInterface>{
    return this.http.get<MySubjectInterface>(`${this.URL}/person/subjects/${email}`)
  }

  uploadPersonOfGroup(id:string):Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/persons/group/${id}`)
  }
}
