import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 _http:HttpClient;
router:any;
 

 signUpForm:any = [ ];
 constructor(_httpRef:HttpClient, private route:Router) {
  this._http = _httpRef,
  this.router = route;
  
  
 }

 getSignUp:boolean = false;
 visible:boolean = false;
  getForm() {
    this.visible = !this.visible;
  }

  onSignUp(value:any) {
    fetch('https://localhost:5001/api/User/createUser', 
    {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response =>response.json())
    .then(json => console.log(json));
   (this._http.post('https://localhost:5001/api/User/createUser',JSON.stringify(value),{headers:new HttpHeaders({'Content-Type':'application/json'})}) );
    console.log(value);

  }
  onLogin(value:any) {
    console.log(value);
  }
 
  ngOnInit(): void {
  }

navigateByUrl() {
  this.router.navigateByUrl('plans');
}
}
