import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';
import { FormDebugModule } from '../form-debug/form-debug.module';

@NgModule({
  declarations: [
    TemplateFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormDebugModule
  ],
  exports: [
    TemplateFormComponent
  ]
})
export class TemplateFormModule { }
