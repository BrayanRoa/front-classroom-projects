import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//* NG ZORRO
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MainRoutingModule } from './main-routing.module';
import { AllPersonsComponent } from './persons/page/all-persons/all-persons.component';
import { RegisterTeacherComponent } from './persons/page/register-teacher/register-teacher.component';

@NgModule({
  declarations: [
    MainPageComponent,
    AllPersonsComponent,
    RegisterTeacherComponent
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    MainRoutingModule
  ]
})
export class MainModule { }
