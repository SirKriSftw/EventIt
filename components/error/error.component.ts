import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  errorPopUp() {
    const dialogRef = this.dialog.open(ErrorComponent, {width:'40%'});

    dialogRef.afterClosed().subscribe();
  }

  ngOnInit(): void {
  }

}

export class ErrorContent {
  onError(value:any)
  {
    console.log(value)
  }
  
}