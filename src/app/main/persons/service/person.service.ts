import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../../../shared/interfaces/response.interface';
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

  uploadPersons():Observable<GetAllPersonsInterface>{
    return this.http.get<GetAllPersonsInterface>(`${this.URL}/persons`)
  }
}
