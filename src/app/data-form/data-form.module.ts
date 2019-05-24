import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataFormComponent } from './data-form.component';

@NgModule({
  declarations: [
    DataFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DataFormComponent,
  ]
})
export class DataFormModule { }
