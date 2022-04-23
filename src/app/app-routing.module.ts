import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './components/plans/plans.component';
import { UsersComponent } from './components/users/users.component';
import { AuthenticateService } from './services/authenticate.service';




const routes: Routes = [ 
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component: UsersComponent},
  {path: "plans", component: PlansComponent, canActivate:[AuthenticateService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

