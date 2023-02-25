import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseToken } from 'src/app/shared/interfaces/response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL: string = environment.API_URL

  constructor(
    private readonly http: HttpClient
  ) { }

  login(email: string, password: string): Observable<ResponseToken> {
    const body = { email, password }
    return this.http.post<ResponseToken>(`${this.URL}/auth/login`, body)
  }


}
