import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';




@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 _http:HttpClient;

 

 signUpForm:any = [ ];
 constructor(_httpRef:HttpClient) {
  this._http = _httpRef;
  
  
 }

  getForm() {
    this._http.get('#SignUp')
  }

  onSignUp(value:any) {
   // console.log(this._http.post('https://localhost:44340/api/User', "{email: 'eventit@email', Password: 'test', name:'Gerome'}",{headers:new HttpHeaders({'Content-Type':'application/json'})}) );
    console.log(value);

  }
  onLogin(value:any) {
    console.log(value);
  }
 

  ngOnInit(): void {
  }

}
