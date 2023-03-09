import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private loginService: LoginService,
    private router:Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
      // return this.loginService.verifyAuthentication().pipe(
      //   tap( isAuthenticated =>{
      //     if(!isAuthenticated){
      //       this.router.navigateByUrl("/auth/login")
      //     }
      //   })
      // )
      return this.loginService.verifyAuthentication().pipe(
        map((isAuthenticated)=>{
          return isAuthenticated || this.router.createUrlTree(["/auth/login"]);
        })
      )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> {
    
    // return this.loginService.verifyAuthentication().pipe(
    //   tap( isAuthenticated =>{
    //     if(!isAuthenticated){
    //       this.router.navigateByUrl("/auth/login")
    //     }
    //   })
    // )

    return this.loginService.verifyAuthentication().pipe(
      map((isAuthenticated)=>{
        return isAuthenticated || this.router.createUrlTree(["/auth/login"]);
      })
    )
  }
}
