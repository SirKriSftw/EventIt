import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  _http:HttpClient
  constructor(_httpRef:HttpClient) {
    this._http = _httpRef;
   }

  createPlan(value:any)
  {
    this._http.post('https://localhost:5001/api/Plan/createplan',value,{headers:new HttpHeaders({'Content-Type':'application/json'})}).subscribe();
  }
}