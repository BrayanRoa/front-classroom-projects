import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './main-access/components/log-in/log-in.component';
import { MainAccessComponent } from './main-access/page/main-access.component';
import { RegisterComponent } from './main-access/components/register/register.component';

const routes : Routes = [
  {path:"", 
  component:MainAccessComponent,
  children:[
    { path:"login", component:LogInComponent},
    { path:"register", component:RegisterComponent},
    { path:"**", redirectTo:"login"}
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
