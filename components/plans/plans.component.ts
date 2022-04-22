import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  _http:HttpClient;
  plans:any;
  loggedInUser:any;
  constructor(_httpRef:HttpClient, _planRef:PlansService) 
  { 
    this.loggedInUser = localStorage.getItem('currentUser');
    this._http = _httpRef;
    this._plan = _planRef;
  }
  _plan:PlansService
  ngOnInit(): void {
    var userId = JSON.parse(this.loggedInUser).userId;
    console.log(this._http.get('https://localhost:5001/api/Plan/getPlan/' + userId).subscribe(
      (result) => {
        this.plans = result;
        console.log(this.plans);
      }
    ))
    
  }

  onCreatePlan(value:any){
    this._plan.createPlan(value);
  }
}