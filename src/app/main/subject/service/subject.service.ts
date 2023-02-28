import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SubjectInterface } from '../interfaces/subject.interface';
import { ResponseHttp } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private URL:string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  uploadSubjects():Observable<SubjectInterface>{
    return this.http.get<SubjectInterface>(`${this.URL}/subjects`)
  }

  register(code:string, name:string):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/subject/create`,{code, name})
  }
}
