import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlansService } from 'src/app/services/plans.service';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
@Component({
  selector: 'app-addplan',
  templateUrl: './addplan.component.html',
  styleUrls: ['./addplan.component.css']
})
export class AddplanComponent implements OnInit {
test:any;
  constructor(public dialog: MatDialog) { }

    makePlan() {
      const dialogRef = this.dialog.open(AddPlanContent, {width:'80%', height: '70%'});
  
      dialogRef.afterClosed().subscribe();
    }

  

  ngOnInit(): void {
  }

}



@Component({
  selector: 'add-plan-content',
  templateUrl: './addplan-content.html',
})
export class AddPlanContent {
  selected:any;
  _plan:PlansService
  constructor(_planRef:PlansService)
  {
    this._plan = _planRef;
  }

 onAddPlan(value:any)
 {
   this._plan.createPlan(value);
 }
  
}