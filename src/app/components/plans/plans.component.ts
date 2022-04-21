import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  _http:HttpClient;
  plans:any;
  loggedInUser:any;
  constructor(_httpRef:HttpClient) 
  { 
    this.loggedInUser = localStorage.getItem('currentUser');
    this._http = _httpRef;
    
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
