import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario;

  constructor(public servicio: SidebarService, private servicioUsuarios: UsuarioService) { 
    
    this.menuItems = servicio.menu;

    this.usuario = servicioUsuarios.usuario;
  }

  ngOnInit(): void {
  }

}
