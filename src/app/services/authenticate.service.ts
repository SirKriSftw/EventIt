import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  _http:HttpClient;
  public currentUser:any;
 router:any;
  constructor(_httpRef:HttpClient, private route:Router) {
    this._http = _httpRef;
    this.currentUser = localStorage.getItem('currentUser');
    this.router = route;
   }

  authenticate(email:any, password:any)
  {
    var isAuth = false;
    var body = {
      'email': email,
      'password': password
    }
    return this._http.post('https://localhost:44371/api/User/authenticate',body,{headers:new HttpHeaders({'Content-Type':'application/json'})}).pipe(map(user =>
    {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }));
    
  }

  logOut():void {
    localStorage.removeItem('currentUser');
  }

  canActivate(): boolean {
    if(localStorage.getItem('currentUser') != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
 
  }

