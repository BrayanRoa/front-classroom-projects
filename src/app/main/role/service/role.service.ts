import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleInterface } from '../interface/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private URL: string = environment.API_URL

  constructor(
    private readonly http:HttpClient
  ) { }

  uploadRoles():Observable<RoleInterface>{
    return this.http.get<RoleInterface>(`${this.URL}/roles`)
  }
}
