import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  public usuario = {
    nome: 'Paulo',
    email: 'paulo@paulo.com'
  }
  constructor() { }

  ngOnInit() {
  }
  onSubmit(formulario) {
    console.log(formulario.value);

    console.log(this.usuario);
  }
}
