import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-editbutton',
  templateUrl: './editbutton.component.html',
  styleUrls: ['./editbutton.component.css']
})
export class EditbuttonComponent implements OnInit {

  @Input()
  planId:any;
  @Input()
  planTitle:any;
  @Input()
  planStart:any;
  @Input()
  planEnd:any;
  @Input()
  planDetails:any;
  constructor(public dialog: MatDialog) { }

  openEditDialog() {
    let dialogRef = this.dialog.open(EditbuttonContent, {width:'50%'});
    dialogRef.componentInstance.planId = this.planId;
    dialogRef.componentInstance.planTitle = this.planTitle;
    dialogRef.componentInstance.planStart = this.planStart;
    dialogRef.componentInstance.planEnd = this.planEnd;
    dialogRef.componentInstance.planDetails = this.planDetails;
  
    dialogRef.afterClosed().subscribe();
  }
  ngOnInit(): void {
  }
}

@Component({
  selector: 'editbutton-content',
  templateUrl: './editbutton-content.html',
  styleUrls: ['./editbutton.component.css']
})
export class EditbuttonContent {
  _planService:PlanService;
  error = '';
  @Input()
  planId:any;
  @Input()
  planTitle:any;
  @Input()
  planStart:any;
  @Input()
  planEnd:any;
  @Input()
  planDetails:any;

  ngOnInit(): void
  {
  }
  constructor(_planServiceRef:PlanService){
    this._planService = _planServiceRef;
  }
  
  onEdit(value:any)
  {
    value['planId'] = this.planId
    let loggedUser:any = localStorage.getItem('currentUser');
    value['userId'] = JSON.parse(loggedUser).userId;
    this._planService.editPlan(value).subscribe((response) => {
      this.error='';
      window.location.reload(); 
    },
    (err) => {
      if(err.status == 201)
      {
        this.error='';
        window.location.reload(); 
      }
      else
      {
        console.log(err)
        this.error="Failed to edit plan";
      }      
    })      
  }
}
