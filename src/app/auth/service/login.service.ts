import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataToken, ResponseToken } from '../interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL: string = environment.API_URL
  private _auth!: DataToken | undefined

  constructor(
    private readonly http: HttpClient
  ) { }

  get auth(){
    return {...this._auth}
  }

  login(email: string, password: string): Observable<ResponseToken> {
    const body = { email, password }
    return this.http.post<ResponseToken>(`${this.URL}/auth/login`, body).pipe(
      tap(auth => this._auth = auth.data),
      tap(auth => {
        localStorage.setItem("token", auth.data.accessToken)
        localStorage.setItem("email", auth.data.email)
        localStorage.setItem("role", auth.data.role)
      })
    )
  }

  logout(){
    this._auth = undefined
  }

  verifyAuthentication():Observable<boolean>{
    if(!localStorage.getItem("token")){
      return of(false)
    }
    return of(true)
  }
}
