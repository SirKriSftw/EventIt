import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  router:any;
  _auth:AuthenticateService;
  _http:HttpClient;
  _planService:PlanService;
  futurePlans:any;
  pastPlans:any;
  showPastPlans = false;
  loggedInUser:any;
  constructor(_httpRef:HttpClient, _planServiceRef:PlanService, private route:Router, _authRef:AuthenticateService) 
  { 
    this._http = _httpRef;
    this._planService = _planServiceRef;
    this.router = route;
    this._auth = _authRef;
  }

  logOut():void {
    this._auth.navigateLogOutByUrl();
    this.router.navigateByUrl('login');
  }
  ngOnInit(): void {
    this.updatePlans();
  }

  updatePlans(){
    this._planService.getFuturePlans().subscribe((result:any) =>{
      this.futurePlans = result;
      console.log(this.futurePlans)
    })
  }
  togglePastPlans() {
    if(this.pastPlans == null){
      this.getPastPlans();
    }
    if(this.showPastPlans)
    {
      this.showPastPlans = false;
    }
    else
    {
      this.showPastPlans = true;
    }
  }
  getPastPlans() {
    this._planService.getPastPlans().subscribe((result:any) =>{
      this.pastPlans = result;
    })
  }
}