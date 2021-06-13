import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;

  constructor( private servicio: UsuarioService, private router: Router ) { 
    this.imgUrl = servicio.usuario.imagenUrl;
    this.usuario = servicio.usuario;
  }

  LogOut(){
    this.servicio.logout();
  }

  ngOnInit(): void {
  }

  buscar( termino: string ){
    console.log( termino );
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
