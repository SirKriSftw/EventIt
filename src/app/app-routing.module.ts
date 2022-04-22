import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './components/plans/plans.component';
import { UsersComponent } from './components/users/users.component';




const routes: Routes = [ 
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component: UsersComponent},
  {path: "plans", component: PlansComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

