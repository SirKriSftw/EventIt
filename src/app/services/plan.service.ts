import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  _http:HttpClient
  loggedInUser:any;

  constructor(_httpRef:HttpClient) {
    this._http = _httpRef;
    this.loggedInUser = localStorage.getItem('currentUser');
  }

  getFuturePlans():any{
    var userId = JSON.parse(this.loggedInUser).userId;
    console.log(userId)
    return this._http.get('https://localhost:44371/api/Plan/getFuturePlans/' + userId)
  }

  getPastPlans():any{
    var userId = JSON.parse(this.loggedInUser).userId;
    console.log(userId)
    return this._http.get('https://localhost:44371/api/Plan/getPastPlans/' + userId)
  }
}
