import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';



@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  _http:HttpClient;
  plans:any;
  router:any;
  value:any;
  _auth:AuthenticateService;

  loggedInUser:any;
  constructor(_httpRef:HttpClient,_authRef:AuthenticateService, private route:Router) 
  { 
    this.loggedInUser = localStorage.getItem('currentUser');
    this._http = _httpRef;
    this.router = route;
    this._auth = _authRef;
  }
 logOut():void {
   this._auth.navigateLogOutByUrl();
   this.router.navigateByUrl('login');
 }
  ngOnInit(): void {
    var userId = JSON.parse(this.loggedInUser).userId;
    console.log(this._http.get('https://localhost:44371/api/Plan/getPlan/' + userId).subscribe(
      (result) => {
        this.plans = result;
        console.log(this.plans);
      }
    ))
    
    }
  }

