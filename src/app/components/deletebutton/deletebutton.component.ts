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
  @Input()
  plans:any = [];

  _planService:PlanService
  constructor(_planServiceRef:PlanService) {
    this._planService = _planServiceRef;
   }

  ngOnInit(): void {
  }

  deletePlan(){
    this._planService.delPlan(this.planId).subscribe((result) => {
      var index = this.plans.findIndex((item:any, i:any) =>{
        return item.planId === this.planId;
      });
      this.plans = this.plans.splice(index, 1);
    });
  }
}
