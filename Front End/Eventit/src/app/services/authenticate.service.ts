import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  _http:HttpClient;
  public currentUser:any;

  constructor(_httpRef:HttpClient) {
    this._http = _httpRef;
    this.currentUser = localStorage.getItem('currentUser');
   }

  authenticate(email:any, password:any)
  {
    var isAuth = false;
    var body = {
      'email': email,
      'password': password
    }
    return this._http.post('https://localhost:5001/api/User/authenticate',body,{headers:new HttpHeaders({'Content-Type':'application/json'})}).pipe(map(user =>
    {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }));
    
  }
}