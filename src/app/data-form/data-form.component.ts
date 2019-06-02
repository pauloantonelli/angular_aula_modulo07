import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
 // aula-91-forms-data-driven-

  public formulario: FormGroup;
  public respostaServidor: object;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    // estilo mais verboso, para formularios pequenos
    /*
    this.formulario = new FormGroup({
      nome: new FormControl('Paulo'),
      email: new FormControl('paulo@paulo.com'),
    });
    */
   // estilo menos verboso, para formularios grandes
    this.formulario = this.formBuilder.group({
      nome: ['Paulo'],
      email: [null]
    });
  }
  onSubmit() {
    console.log('this.formulario: ', this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(resposta => this.respostaServidor = resposta);
  }
}
