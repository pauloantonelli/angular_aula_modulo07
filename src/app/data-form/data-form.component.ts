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
      cep: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      numero: new FormControl(null, Validators.required),
      complemento: new FormControl(null, Validators.required),
      rua: new FormControl(null, Validators.required),
      bairro: new FormControl(null, Validators.required),
      cidade: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
    });
    */
   // estilo menos verboso, para formularios grandes
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: ['paulo@paulo.com', [Validators.required, Validators.email]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      numero: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
    });
  }
  onSubmit() {
    console.log('this.formulario: ', this.formulario.controls);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(resposta => {
      this.respostaServidor = resposta;
      // this.resetarFormulario();
    });
  }
  resetarFormulario() {
    this.formulario.reset();
  }

  validaFormulario(campo) {
    return this.formulario.get(campo).invalid && this.formulario.controls[campo].touched;
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
}
