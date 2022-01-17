import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, Observable, of, map } from 'rxjs';

import { Auth } from '../interfeces/auth.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined
  constructor(private http: HttpClient) { }

  get auth() {
    return {...this._auth};
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap( auth => this._auth = auth),
      tap( auth => localStorage.setItem('token',auth.id))
    );
  }

  logout() {
    this._auth = undefined;
  }

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map( auth => {
        this._auth = auth;
        return true;
      }) 
    );
  }
}
