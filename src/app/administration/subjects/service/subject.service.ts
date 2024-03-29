import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseHttp } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { SubjectInterface } from '../interfaces/all-subject.interface';

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
