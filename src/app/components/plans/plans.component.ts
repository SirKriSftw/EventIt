import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  _http:HttpClient;
  _planService:PlanService;
  futurePlans:any;
  pastPlans:any;
  showPastPlans = false;
  loggedInUser:any;
  constructor(_httpRef:HttpClient, _planServiceRef:PlanService) 
  { 
    this._http = _httpRef;
    this._planService = _planServiceRef;
  }

  ngOnInit(): void {
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
    console.log(this.showPastPlans)
  }
  getPastPlans() {
    this._planService.getPastPlans().subscribe((result:any) =>{
      this.pastPlans = result;
      console.log(this.pastPlans);
    })
  }
}
