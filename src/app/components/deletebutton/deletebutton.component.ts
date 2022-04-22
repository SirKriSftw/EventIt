import { Component, Input, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-deletebutton',
  templateUrl: './deletebutton.component.html',
  styleUrls: ['./deletebutton.component.css']
})
export class DeletebuttonComponent implements OnInit {

  @Input()
  planId: number = -1;

  _planService:PlanService
  constructor(_planServiceRef:PlanService) {
    this._planService = _planServiceRef;
   }

  ngOnInit(): void {
  }

  deletePlan(){
    this._planService.delPlan(this.planId).subscribe();
  }
}
