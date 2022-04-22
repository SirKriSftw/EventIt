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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddplanComponent, AddPlanContent } from './components/addplan/addplan.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog.component';
import { SignUpDialogContent } from './components/signup-dialog/signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddbuttonComponent, AddbuttonContent } from './components/addbutton/addbutton.component';
import {MatInputModule} from '@angular/material/input';
import { DeletebuttonComponent } from './components/deletebutton/deletebutton.component';
import { EditbuttonComponent } from './components/editbutton/editbutton.component';
import { ErrorComponent } from './components/error/error.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';








@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PlansComponent,
    SignupDialogComponent,
    SignUpDialogContent,
    AddbuttonComponent,
    AddbuttonContent,
    AddplanComponent,
    DeletebuttonComponent,
    EditbuttonComponent,
    ErrorComponent,
    AddPlanContent,
  

    
    
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
     MatButtonModule,
     NgxMatTimepickerModule,
     NgxMatDatetimePickerModule,
     MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }