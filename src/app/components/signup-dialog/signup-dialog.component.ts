import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

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

  _user:UsersService
  constructor(_userRef:UsersService)
  {
    this._user = _userRef;
  }

  onSignUp(value:any) {
    this._user.signUp(value);
  }
}
