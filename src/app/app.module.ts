import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap';
import { TemplateFormComponent } from './template-form/template-form.component';
import { DataFormComponent } from './data-form/data-form.component';
@NgModule({
   declarations: [
      AppComponent,
      TemplateFormComponent,
      DataFormComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      AlertModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
