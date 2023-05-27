import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GroupSubjectInterface } from '../interfaces/group-subject.interface';
import { NewGroupInterface } from '../interfaces/new-group-interface';
import { GroupProjectsInterface } from '../interfaces/group-projects.interface';
import { OneGroupInterface } from '../interfaces/one-group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  URL: string = environment.API_NODE
  URL_spring: string = environment.API_SPRING


  constructor(
    private http: HttpClient
  ) { }

  //* podria validar que sea un uuid aqui? 👀
  // uploadPersonsOfGroup(group_id: string): Observable<any> {
  //   return this.http.get<any>(`${this.URL}/group/all/persons/${group_id}`)
  // }

  uploadGroupOfSubject(id: string): Observable<GroupSubjectInterface> {
    return this.http.get<GroupSubjectInterface>(`${this.URL}/subject/groups/teachers/${id}`)
  }

  //Lista de los proyectos existentes en un grupo
  listProjectGroup(id:string): Observable<any> {
    return this.http.get<any>(`${this.URL_spring}/project/projects_by_group_id/${id}`)
  }

  //lista de los alumnos existentes en un grupo
  listGroup(id:string): Observable<any>{
    return this.http.get<any>(`${this.URL_spring}/group/persons_by_group_id/${id}`)
  }

  //Asignar un alumno a un proyecto
  AsigProject(proyecto:string, persona: string, state: string): Observable<any>{
    return this.http.post<any>(`${this.URL_spring}/project/person_project`, {proyecto, persona, state})
  }


  createGroup(name: string, subject_code: string): Observable<NewGroupInterface> {
    return this.http.post<NewGroupInterface>(`${this.URL}/group/create`, { name, subject_code })
  }

  uploadProjectsOfGroup(group_id:string):Observable<GroupProjectsInterface>{
    return this.http.get<GroupProjectsInterface>(`${this.URL}/group/projects/${group_id}`)
  }

  uploadOneGroup(id:string):Observable<OneGroupInterface>{
    return this.http.get<OneGroupInterface>(`${this.URL}/group/${id}`)
  }

  // findAllTaskOfGroup(id:string):Observable<AllTaskInterface>{
  //   return this.http.get<AllTaskInterface>(`${this.URL}/group/tasks/${id}`)
  // }
}
