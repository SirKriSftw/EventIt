import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';




@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 _http:HttpClient;
 _auth:AuthenticateService;
router:any;
error = '';
 

 signUpForm:any = [ ];
 constructor(_httpRef:HttpClient, _authRef:AuthenticateService, private route:Router) {
  this._http = _httpRef;
  this._auth = _authRef;
  this.router = route;
  
  
 }

 getSignUp:boolean = false;
 visible:boolean = false;
  getForm() {
    this.visible = !this.visible;
  }

  onSignUp(value:any) {
   this._http.post('https://localhost:44371/api/User/createUser',JSON.stringify(value),{headers:new HttpHeaders({'Content-Type':'application/json'})}).subscribe();
    console.log(value);

  }
  onLogin(value:any) {
    console.log(this._auth.authenticate(value.email,value.password).subscribe((result) =>
    {
      this.navigateByUrl();
    },
    (err) => {
      this.error = err.error.message != undefined ? err.error.message : 'Error trying to login';
    }
    ));
    console.log(this._auth.currentUser);
  }
 
  ngOnInit(): void {
  }

navigateByUrl() {
  this.router.navigateByUrl('plans');
}
}
