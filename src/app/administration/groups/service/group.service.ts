import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GroupSubjectInterface } from '../interfaces/group-subject.interface';
import { NewGroupInterface } from '../interfaces/new-group-interface';
import { GroupProjectsInterface } from '../interfaces/group-projects.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  URL: string = environment.API_URL


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

  createGroup(name: string, subject_code: string): Observable<NewGroupInterface> {
    return this.http.post<NewGroupInterface>(`${this.URL}/group/create`, { name, subject_code })
  }

  uploadProjectsOfGroup(group_id:string):Observable<GroupProjectsInterface>{
    return this.http.get<GroupProjectsInterface>(`${this.URL}/group/projects/${group_id}`)
  }

}
