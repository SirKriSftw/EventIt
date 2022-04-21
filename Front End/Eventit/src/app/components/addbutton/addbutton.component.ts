import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addbutton',
  templateUrl: './addbutton.component.html',
  styleUrls: ['./addbutton.component.css']
})
export class AddbuttonComponent {

  test:any;
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
  onAdd(value:any)
  {
    console.log(value)
  }
  
}