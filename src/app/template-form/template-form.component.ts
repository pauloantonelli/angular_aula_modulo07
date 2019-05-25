import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  public usuario = {
    nome: null,
    email: null
  }
  constructor() { }

  ngOnInit() {
  }
  onSubmit(formulario) {
    console.log(formulario);

    // console.log(this.usuario);
  }
  verificaValidoTocado(campo) {
    return campo.invalid && campo.touched;
  }
  aplicaErroCss(campo) {
    return {
      'has-error': this.verificaValidoTocado(campo),
      'has-feedback' : this.verificaValidoTocado(campo),
    };
  }
}
