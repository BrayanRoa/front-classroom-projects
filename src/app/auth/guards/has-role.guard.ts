import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanLoad {

  constructor(
    private loginService:LoginService
  ){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | boolean {
    const allowed = route.data?.['allowedRoles']
    const auth = this.loginService.auth
    // if(auth && allowed.includes(auth.role)){
    //   return true
    // }
    console.log(auth && allowed.includes(auth.role));
    return Boolean(auth && allowed.includes(auth.role))
  }
}
