import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor( private activated: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activated.params.subscribe( ({ termino }) => {
      console.log( termino );
    })
  }

}
