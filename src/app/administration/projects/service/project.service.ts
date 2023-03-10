import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseHttp } from 'src/app/shared/interfaces/response.interface';
import { NewProjectInterface } from '../interfaces/new-project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly URL:string = environment.API_URL

  constructor(
    private http:HttpClient
  ) { }

  create(body:NewProjectInterface):Observable<ResponseHttp>{
    return this.http.post<ResponseHttp>(`${this.URL}/project/create`, {...body})
  }
}
