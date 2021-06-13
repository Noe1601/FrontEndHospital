import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa = new Promise( ( resolve, reject ) => {
      if(true){
        resolve('Hola mundo');
      }else {
        reject("algo anda mal");
      }
    });

    promesa.then( (mensaje) => {
      console.log(mensaje);
    })
    .catch( error => console.log("Error en mi promesa", error));

    console.log('Fin del init');

   // this.getUsuarios();

    this.getUsuarios().then(usuarios => {
      console.log( usuarios );
    });

  }

  getUsuarios(){

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then( resp => resp.json() )
      .then( body => resolve( body.data ) )
    });

    return promesa;
   
  }

}
