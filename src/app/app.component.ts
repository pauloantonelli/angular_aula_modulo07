import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Modulo07';

  ngOnInit() {
    console.log('(_(\n/_/`_____/)\n"  |      |\n   |""""""|');
    console.log(
      "%cMeuPortfol.io","color: #000; font-weight: bold; font-size: 30px; font-family: sans-serif;"
    );
    console.log(
      "%cMeuPortfol.io","color: rgb(110, 175, 44); font-weight: bold; font-size: 35px; font-family: sans-serif;"
    );
    console.log(
      "%cPowered by MeuPortfol.io","color: rgb(110, 175, 44); font-weight: bold; font-size: 20px; font-family: sans-serif;"
    );
    console.log(
      "%chttps://meuportfol.io/","color: rgb(110, 175, 44); font-weight: bold; font-size: 10px; font-family: sans-serif;"
    );
  }
}
