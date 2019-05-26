import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onSubmit(formulario) {
    console.log(formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .subscribe(
      (resposta) => {
        console.log("TCL: TemplateFormComponent -> onSubmit -> resposta", resposta)
      }
    );
  }
  verificaValidoTocado(campo) {
    return campo.invalid && campo.touched;
  }
  aplicaErroCss(campo) {
    return {
      'has-error': this.verificaValidoTocado(campo),
      'has-feedback': this.verificaValidoTocado(campo),
    };
  }

  limpaCampoCep() {
    document.getElementById('cep')['value'] = '';
    document.getElementById('complemento')['value'] = '';
    document.getElementById('rua')['value'] = '';
    document.getElementById('bairro')['value'] = '';
    document.getElementById('cidade')['value'] = '';
    document.getElementById('estado')['value'] = '';
  }
  preencheCamposCallback(dados) {
    if (!dados.erro) {
      document.getElementById('complemento')['value'] = dados.complemento;
      document.getElementById('rua')['value'] = dados.logradouro;
      document.getElementById('bairro')['value'] = dados.bairro;
      document.getElementById('cidade')['value'] = dados.localidade;
      document.getElementById('estado')['value'] = dados.uf;
    } else {
      this.limpaCampoCep();
      alert('CEP não encontrado! Por favor tente novamente');
    }
  }
  consultaCep(cep, form) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo != '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cepLimpo)) {
        this.http.get('https://viacep.com.br/ws/' + cepLimpo + '/json')
          .subscribe(
            (cep) => {
              this.populaDadosForm(cep, form);
              // this.preencheCamposCallback(cep);
            }
          );
      } else {
        this.limpaCampoCep();
        alert('Formato de CEP incorreto, tente novamente!');
      }
    } else {
      this.limpaCampoCep();
    }
  }
  populaDadosForm(cep, formulario) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        cep: cep.cep,
        numero: '',
        complemento: cep.complemento,
        rua: cep.logradouro,
        bairro: cep.bairro,
        cidade: cep.localidade,
        estado: cep.uf,
      }
    });*/
    formulario.form.patchValue({
      endereco: {
        cep: cep.cep,
        numero: '',
        complemento: cep.complemento,
        rua: cep.logradouro,
        bairro: cep.bairro,
        cidade: cep.localidade,
        estado: cep.uf,
      }
    });
  }
}
