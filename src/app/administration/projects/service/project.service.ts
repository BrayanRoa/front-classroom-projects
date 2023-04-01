import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseHttp } from 'src/app/shared/interfaces/response.interface';
import { NewProjectInterface } from '../interfaces/new-project.interface';
import { OneProjectInterface } from '../interfaces/one-project.interface';
import { PersonWithProject } from '../interfaces/person_with_project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly URL:string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  create(body:NewProjectInterface):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/project/create`, body)
  }

  uploadExcelOfProjects(id:string,archivo:any):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/projects/excel/${id}`, archivo)
  }

  findOneProject(id:string):Observable<OneProjectInterface>{
    return this.http.get<OneProjectInterface>(`${this.URL}/project/${id}`)
  }

  changeState(id:string, state:string):Observable<ResponseHttp>{
    return this.http.patch<ResponseHttp>(`${this.URL}/project/change_state`,{id, state})
  }

  findProjectsWithPersons(id:string):Observable<PersonWithProject>{
    return this.http.get<PersonWithProject>(`${this.URL}/project_person/persons/${id}`)
  }
}
