import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataFormComponent } from './data-form.component';
import { FormDebugModule } from '../form-debug/form-debug.module';
import { ErrorMessageModule } from '../error-message/error-message.module';

@NgModule({
  declarations: [
    DataFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormDebugModule,
    HttpClientModule,
    ErrorMessageModule
  ],
  exports: [
    DataFormComponent,
  ]
})
export class DataFormModule { }
