import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { FieldsetModule } from 'primeng/fieldset';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    TagModule,
    ChipModule,
    TableModule,
    FileUploadModule,
    BreadcrumbModule,
    ToolbarModule,
    DataViewModule,
    FieldsetModule,
    NzSkeletonModule,
    BadgeModule
  ],
  exports: [
    ButtonModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    TagModule,
    ChipModule,
    TableModule,
    FileUploadModule,
    BreadcrumbModule,
    ToolbarModule,
    DataViewModule,
    DataViewLayoutOptions,
    FieldsetModule,
    NzSkeletonModule,
    BadgeModule
  ]
})
export class PrimeNgModule { }
