import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { PlanService } from 'src/app/services/plan.service';

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
  constructor(_httpRef:HttpClient,_authRef:AuthenticateService, private route:Router , _planServiceRef:PlanService) 

  { 
    this._http = _httpRef;
    this.router = route;
    this._auth = _authRef;
    this._planService = _planServiceRef;
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
      this.futurePlans.sort();
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
