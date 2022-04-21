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

 

 signUpForm:any = [ ];


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
  async onLogin(value: any) {
    value.name = null;
    console.log(value);
      let response = await fetch('https://localhost:5001/api/User/getUserID/'+value.email+"?password="+value.password);
  
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    console.log(json);
      let plans = await fetch('https://localhost:5001/api/Plan/getPlan/'+json);
        if(plans.ok){
          let arr = await plans.json();
            console.log(JSON.stringify(arr)); 
        }
        else if (plans.status == 400)
        {
          this.navigateByUrl();
        }
  } 
  else {
    alert("Incorrect Username or Password");
  }
  
 
  ngOnInit(): void {
  }

navigateByUrl() {
  this.router.navigateByUrl('plans');
}
}
