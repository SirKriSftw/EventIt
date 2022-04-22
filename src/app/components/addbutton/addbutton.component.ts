import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  router:Router;

  constructor(_planServiceRef:PlanService, routerRef:Router){
    this._planService = _planServiceRef;
    this.router = routerRef;
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
        this.router.navigateByUrl('plans');
      }
      else
      {
        this.error="Failed to add new plan";
      }
      
    })
    console.log(value)
  }
  
 
}



