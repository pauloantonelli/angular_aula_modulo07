import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
  preserveWhitespaces: true,
})
export class DataFormComponent implements OnInit {
  // aula-9-forms-data-driven-

  public formulario: FormGroup;
  public respostaServidor: object;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    // estilo mais verboso, para formularios pequenos

    /*
    this.formulario = new FormGroup({
      nome: new FormControl('Paulo', Validators.minLength(3)),
      email: new FormControl('paulo@paulo.com', [Validators.required, Validators.email]),
      endereco: new FormGroup({
        cep: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        numero: new FormControl(null, Validators.required),
        complemento: new FormControl(null, Validators.required),
        rua: new FormControl(null, Validators.required),
        bairro: new FormControl(null, Validators.required),
        cidade: new FormControl(null, Validators.required),
        estado: new FormControl(null, Validators.required),
      }),
    });
     */

    // estilo menos verboso, para formularios grandes
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: ['paulo@paulo.com', [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    });

    // this.resetarFormulario();
    this.limpaCampoCep();
  }
  onSubmit() {
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe(resposta => {
          this.respostaServidor = resposta;
          // this.resetarFormulario();
        });
    } else {
      /*VERIFICAÇÃO BASICA SEM ANINHAMENTO DE CAMPOS*/
      /*
      Object.keys(this.formulario.controls).forEach((campo) => {
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      });*/
      this.verificaValidacoesFormularioGenerica(this.formulario);
    }
  }
  verificaValidacoesFormularioGenerica(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      console.log('campo: ', campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormularioGenerica(controle);
      }
    });
  }

  resetarFormulario() {
    this.formulario.reset();
  }

  validaFormulario(campo) {
    // return this.formulario.get(campo).invalid && this.formulario.controls[campo].touched;
    return this.formulario.get(campo).invalid;
  }

  verificaNomeRequerido() {
    const campoNome = this.formulario.get('nome');
    if (campoNome.errors) {
      return campoNome.errors['required'] && campoNome.touched;
    }
  }
  verificaNomeTamanho() {
    const campoNome = this.formulario.get('nome');
    if (campoNome.errors) {
      return campoNome.errors['minlength'] && campoNome.touched;
    }
  }
  verificaEmailRequerido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['required'] && campoEmail.touched;
    }
  }
  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaErroCss(campo: string) {
    return {
      'has-error': this.validaFormulario(campo),
      'has-feedback': this.validaFormulario(campo)
    };
  }
  consultaCep() {
    const cep = this.formulario.get('endereco.cep').value;

    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo != '') {
      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cepLimpo)) {
        this.http.get('https://viacep.com.br/ws/' + cepLimpo + '/json')
          .subscribe(
            (dados) => {
              this.populaDadosForm(dados);
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
  populaDadosForm(dados) {
    this.formulario.setValue({
      nome: this.formulario.get('nome').value,
      email: this.formulario.get('email').value,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });
    /*
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });
    */
    this.formulario.get('nome').setValue('Paulo');
  }
  limpaCampoCep() {
    this.formulario.patchValue({
      endereco: {
        cep: '',
        numero: '',
        complemento: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      }
    });
  }
}
