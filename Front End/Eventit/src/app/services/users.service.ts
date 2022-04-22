import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _http:HttpClient
  constructor(_httpRef:HttpClient) {
    this._http = _httpRef;
   }

  signUp(value:any)
  {
    this._http.post('https://localhost:5001/api/User/createUser',value,{headers:new HttpHeaders({'Content-Type':'application/json'})}).subscribe();
  }
}