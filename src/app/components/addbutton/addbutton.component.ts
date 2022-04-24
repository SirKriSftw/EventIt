import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-addbutton',
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.css']
})
export class AddbuttonComponent {
  @Input()
  plans = [];
  constructor(public dialog: MatDialog) { }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddbuttonContent, {width:'50%'});

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
    this._planService.createPlan(value).subscribe((response) => {
      this.error='';
    },
    (err) => {
      if(err.status == 201)
      {
        this.error='';
        window.location.reload(); 
      }
      else
      {
        this.error="Failed to add new plan";
      }
      
    })

      
  }

 
}


