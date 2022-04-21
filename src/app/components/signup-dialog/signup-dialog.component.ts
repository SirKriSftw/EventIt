import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {

  test:any;
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(SignUpDialogContent, {width:'50%'});

    dialogRef.afterClosed().subscribe();
  }
}

@Component({
  selector: 'signup-dialog-content',
  templateUrl: './signup-dialog-content.html',
})
export class SignUpDialogContent {
  _http:HttpClient

  constructor(_httpRef:HttpClient)
  {
    this._http = _httpRef;
  }

  onSignUp(value:any) {
   this._http.post('https://localhost:44371/api/User/createUser',value,{headers:new HttpHeaders({'Content-Type':'application/json'})}).subscribe();
  }
}
