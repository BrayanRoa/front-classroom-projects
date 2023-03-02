import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupPersonService {

  URL: string = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  changeStateOfSubject(person: string, group: string, state: string): Observable<ResponseHttp> {
    const status = {
      person,
      group,
      state
    }
    return this.http.patch<ResponseHttp>(`${this.URL}/group_person/change_status`, status)
  }
}
