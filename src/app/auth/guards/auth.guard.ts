import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      console.log('canActivate',false);
      // console.log('canActivate route',route);
      // console.log('canActivate state',state);
      // console.log(this.authService.auth);

      
    // return this.authService.auth.id ? true : false;


    return this.authService.verificaAutenticacion().pipe(
      tap( estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['/auth/login']);
        }
      }  )
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      console.log('CanLoad',false);
    //   console.log('CanLoad route',route);
    //   console.log('CanLoad segments',segments);
    //   console.log(this.authService.auth);

      
    // return this.authService.auth.id ? true : false;

    return this.authService.verificaAutenticacion().pipe(
      tap( estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigate(['/auth/login']);
        }
      }  )
    );
  }
}
