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
import { SeePersonComponent } from './persons/pages/see-person/see-person.component';
import { PersonsGroupComponent } from './groups/pages/persons-group/persons-group.component';
import { ProjectsGroupComponent } from './groups/pages/projects-group/projects-group.component';
import { SeeOneProjectComponent } from './projects/pages/see-one-project/see-one-project.component';
import { EditProfileComponent } from './persons/pages/edit-profile/edit-profile.component';
import { EditGroupComponent } from './groups/pages/edit-group/edit-group.component';
import { NewProjectComponent } from './projects/pages/new-project/new-project.component';
import { AllTaskComponent } from './task/pages/all-task/all-task.component';


@NgModule({
  declarations: [
    DashboardAdminComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    AllSubjectsComponent,
    MySubjectsComponent,
    AllGroupsComponent,
    SeePersonComponent,
    PersonsGroupComponent,
    ProjectsGroupComponent,
    SeeOneProjectComponent,
    EditProfileComponent,
    EditGroupComponent,
    NewProjectComponent,
    AllTaskComponent
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
