import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzTagModule } from 'ng-zorro-antd/tag';
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
import { NzUploadModule } from 'ng-zorro-antd/upload';
// import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { DataTablesModule } from "angular-datatables";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    // NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpinModule,
    NzCardModule,
    NzModalModule,
    NzResultModule,
    NzAvatarModule,
    NzDropDownModule,
    NzUploadModule,
    // NzBreadCrumbModule
  ],
  exports:[
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    // NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzButtonModule,
    NzToolTipModule,
    NzSpinModule,
    NzCardModule,
    NzModalModule,
    NzResultModule,
    NzAvatarModule,
    NzDropDownModule,
    DataTablesModule,
    NzUploadModule,
    // NzBreadCrumbModule
  ]
})
export class MaterialModule { }
