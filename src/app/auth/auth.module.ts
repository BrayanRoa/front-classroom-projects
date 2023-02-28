import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainAccessComponent } from './main-access/page/main-access.component';
import { LogInComponent } from './main-access/components/log-in/log-in.component';
import { RegisterComponent } from './main-access/components/register/register.component';

//* NG-ZORRO
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    MainAccessComponent,
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzMessageModule
  ]
})
export class AuthModule { }
