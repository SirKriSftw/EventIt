import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './components/plans/plans.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [ 
  {path: "plans", component: PlansComponent},
  {path: "login", component:UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
