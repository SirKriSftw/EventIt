import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { PlansComponent } from './components/plans/plans.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { SignUpDialogContent } from './components/signup-dialog/signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticateService } from './services/authenticate.service';





@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PlansComponent,
    SignupDialogComponent,
    SignUpDialogContent
    
  ],
  imports: [
    BrowserModule, 
    FormsModule,
     HttpClientModule, 
     MatCardModule, 
     MatButtonModule, 
     FlexLayoutModule, 
     MatToolbarModule,
     MatDialogModule,
     BrowserAnimationsModule,
     AppRoutingModule,
     
  
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
