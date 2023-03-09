import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AllStudentsComponent } from './persons/pages/all-students/all-students.component';
import { AllTeachersComponent } from './persons/pages/all-teachers/all-teachers.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllSubjectsComponent } from './subjects/pages/all-subjects/all-subjects.component';
import { MySubjectsComponent } from './subjects/pages/my-subjects/my-subjects.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AllGroupsComponent } from './groups/pages/all-groups/all-groups.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    AllSubjectsComponent,
    MySubjectsComponent,
    AllGroupsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AdministrationRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule
  ]
})
export class AdministrationModule { }
