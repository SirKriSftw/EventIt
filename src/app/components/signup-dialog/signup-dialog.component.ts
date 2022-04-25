import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  styleUrls: ['./signup-dialog.component.css']
})
export class SignUpDialogContent {

  _user:UsersService
  error = '';

  constructor(_userRef:UsersService, public dialogRef:MatDialogRef<SignUpDialogContent>)
  {
    this._user = _userRef;
  }

  onSignUp(value:any) {
    console.log(value)
    if (value.name.length < 3)
    {
      this.error = 'Name must be at least 3 characters';
    }
    else if (value.email.indexOf('@') == -1)
    {
      this.error = 'Invalid email';
    }
    else if (value.password.length < 8)
    {
      this.error = 'Password to short, must be at least 8 characters';
    }
    else
    {
       this._user.signUp(value).subscribe((result) =>{
          this.dialogRef.close()
      },
      (err) => {
        if(err.status == '201')
        {
          this.dialogRef.close()
        }
        else
        {
          this.error = 'Failed to sign up (email already in use)';
        }
      });
    }
  }
  
}
