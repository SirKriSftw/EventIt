import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-addbutton',
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.css']
})
export class AddbuttonComponent {
  constructor(public dialog: MatDialog) { }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddbuttonContent, {width:'50%'});

    dialogRef.afterClosed().subscribe();
  }
}
@Component({
  selector: 'addbutton-content',
  templateUrl: './addbutton-content.html',
})
export class AddbuttonContent {
  _planService:PlanService;
  error = '';

  constructor(_planServiceRef:PlanService){
    this._planService = _planServiceRef;
  }

  onAdd(value:any)
  {
    console.log(value)
    this._planService.createPlan(value).subscribe((response) => {
      console.log(response)
      this.error='';
    },
    (err) => {
      console.log(err)
      if(err.status == 201)
      {
        this.error='';
      }
      else
      {
        this.error="Failed to add new plan";
      }

    })
    console.log(value)
  }

 
}


