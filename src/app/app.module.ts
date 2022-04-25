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
import {MatIconModule} from '@angular/material/icon'

import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { SignUpDialogContent } from './components/signup-dialog/signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddbuttonComponent, AddbuttonContent } from './components/addbutton/addbutton.component';
import {MatInputModule} from '@angular/material/input';
import { EditbuttonComponent, EditbuttonContent } from './components/editbutton/editbutton.component';
import { DeletebuttonComponent } from './components/deletebutton/deletebutton.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';


import { AuthenticateService } from './services/authenticate.service';
import { PlanService } from './services/plan.service';





@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PlansComponent,
    SignupDialogComponent,
    SignUpDialogContent,
    AddbuttonComponent,
    AddbuttonContent,
    EditbuttonComponent,
    DeletebuttonComponent,
    EditbuttonContent
    
    
    
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
     MatInputModule,
     MatIconModule,
     MatTooltipModule,
     MatExpansionModule,
    
  ],
  providers: [AuthenticateService,
              PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
