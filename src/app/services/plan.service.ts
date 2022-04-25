import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createPlan(newPlan:any)
  {
    var data = {
      "title": newPlan.title,
      "details": newPlan.details,
      "planDateStart": newPlan.startTime,
      "planDateEnd": newPlan.endTime,
      "userId": JSON.parse(this.loggedInUser).userId
    }
    return this._http.post('https://localhost:44371/api/Plan/createplan/', data, {headers:new HttpHeaders({'Content-Type':'application/json'})});
  }

  delPlan(planId:any)
  {
    return this._http.delete('https://localhost:44371/api/Plan/deletePlan/' + planId);
  }
  editPlan(plan:any)
  {
    var data = {
      "planId": plan.planId,
      "userId": plan.userId,
      "title": plan.title,
      "details": plan.details,
      "planDateStart": plan.startTime,
      "planDateEnd": plan.endTime,
    }
    return this._http.put('https://localhost:44371/api/Plan/updatePlan', data, {headers:new HttpHeaders({'Content-Type':'application/json'})});
  }

  getFuturePlans():any{
    this.loggedInUser = localStorage.getItem('currentUser');
    var userId = JSON.parse(this.loggedInUser).userId;
    return this._http.get('https://localhost:44371/api/Plan/getFuturePlans/' + userId);
  }

  getPastPlans():any{
    this.loggedInUser = localStorage.getItem('currentUser');
    var userId = JSON.parse(this.loggedInUser).userId;
    return this._http.get('https://localhost:44371/api/Plan/getPastPlans/' + userId);
  }
}
