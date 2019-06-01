import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataFormComponent } from './data-form.component';
import { FormDebugModule } from '../form-debug/form-debug.module';

@NgModule({
  declarations: [
    DataFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormDebugModule,
  ],
  exports: [
    DataFormComponent,
  ]
})
export class DataFormModule { }
