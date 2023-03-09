import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MainAccessComponent } from './pages/main-access/main-access.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: MainAccessComponent,
    children: [
      { path: "login", component: LogInComponent },
      { path: "register", component: RegisterComponent },
      { path: "**", redirectTo: "login" }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
