import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//* NG ZORRO
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MainRoutingModule } from './main-routing.module';
import { AllPersonsComponent } from './persons/page/all-persons/all-persons.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllSubjectsComponent } from './subject/pages/all-subjects/all-subjects.component';
import { PersonsGroupComponent } from './group/pages/persons-group/persons-group.component';
import { ProjectsGroupComponent } from './group/pages/projects-group/projects-group.component';
import { AllGroupsComponent } from './group/pages/all-groups/all-groups.component';
import { MySubjectsComponent } from './subject/pages/my-subjects/my-subjects.component';

@NgModule({
  declarations: [
    MainPageComponent,
    AllPersonsComponent,
    AllSubjectsComponent,
    PersonsGroupComponent,
    ProjectsGroupComponent,
    AllGroupsComponent,
    MySubjectsComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    MainRoutingModule,
    DataTablesModule,
    NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    FormsModule,
    NzToolTipModule,
    NzSpinModule,
    NzCardModule,
    NzModalModule,
    ReactiveFormsModule,
    NzResultModule,
    NzAvatarModule,
    NzDropDownModule
  ]
})
export class MainModule { }
