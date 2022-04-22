import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ErrorComponent } from '../error/error.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  e = new ErrorComponent(this.dialog);
 _http:HttpClient;
 _auth:AuthenticateService;
router:any;
error = '';
 

 signUpForm:any = [ ];
 constructor(_httpRef:HttpClient, _authRef:AuthenticateService, private route:Router, public dialog: MatDialog) {
  this._http = _httpRef;
  this._auth = _authRef;
  this.router = route;
  
  
 }


  onSignUp(value:any) {
    var body = {
      "userID":0,
      "email": value.email,
      "password": value.password,
      "name":value.name
    }
   this._http.post('https://localhost:5001/api/User/createUser',body,{headers:new HttpHeaders({'Content-Type':'application/json'})}).subscribe(
     (result) => {
       console.log(result)
     }
   );
    console.log(value);

  }
  onLogin(value:any) {
    this._auth.authenticate(value.email,value.password).subscribe((result) =>
    {
      this.navigateByUrl();
    },
    (err) => {
      this.e.errorPopUp();
      this.error = err.error.message != undefined ? err.error.message : 'Error trying to login';
    }
    );
    console.log(this._auth.currentUser);
  }

  
 
  ngOnInit(): void {
  }

navigateByUrl() {
  this.router.navigateByUrl('plans');
}
}