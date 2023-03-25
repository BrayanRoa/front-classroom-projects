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

import { BreadcrumbModule } from 'primeng/breadcrumb';

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
    BreadcrumbModule
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
    BreadcrumbModule
  ]
})
export class PrimeNgModule { }
