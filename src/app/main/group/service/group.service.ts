import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { GroupSubjectInterface } from '../interfaces/group-subject.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService{

  URL: string = environment.API_URL
  
  
  constructor(
    private http:HttpClient
  ) {}

  //* podria validar que sea un uuid aqui? 👀
  uploadPersonsOfGroup(group_id:string):Observable<any>{
    return this.http.get<any>(`${this.URL}/group/all/persons/${group_id}`)
  }

  uploadGroupOfSubject(code:string):Observable<GroupSubjectInterface>{
    return this.http.get<GroupSubjectInterface>(`${this.URL}/subject/${code}`)
  }
}
