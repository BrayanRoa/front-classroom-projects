import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    RippleModule
  ],
  exports: [
    ButtonModule,
    AvatarModule,
    InputTextModule,
    RippleModule
  ]
})
export class PrimeNgModule { }
