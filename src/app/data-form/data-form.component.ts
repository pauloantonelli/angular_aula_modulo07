import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  public formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // estilo mais verboso, para formularios pequenos
    /*
    this.formulario = new FormGroup({
      nome: new FormControl('Paulo'),
      email: new FormControl('paulo@paulo.com'),
    });
    */
    this.formulario = this.formBuilder.group({
      nome: ['Paulo'],
      email: [null]
    });
  }

}
