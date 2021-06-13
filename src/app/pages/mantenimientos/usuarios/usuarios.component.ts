import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuarios.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imagenImgSubs: Subscription;

  constructor( private usuarioService: UsuarioService, 
    private busquedaService: BusquedasService,
     private imagenService: ModalImagenService ) { }

     ngOnDestroy(){
       this.imagenImgSubs.unsubscribe();
     }

  ngOnInit(): void {
   this.cargarUsuarios();
   this.imagenImgSubs = this.imagenService.nuevaImagen.pipe( 
     delay(100)
     ).subscribe( img => { 
     this.cargarUsuarios() 
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde).subscribe( ({ totalUsuarios, usuarios}) => {
      this.totalUsuarios = totalUsuarios;
      this.usuarios = usuarios;      
      this.usuariosTemp = usuarios;      
      this.cargando = false;
    })
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }else if( this.desde > this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }


  buscar( termino: string ){

    if( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios',termino)
                      .subscribe( resultados => {
                        this.usuarios = resultados
                      })
  }


  eliminarUsuario( usuario: Usuario ){

    if( usuario.uid === this.usuarioService.uid ){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    }

 
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario )
                          .subscribe( resp => {

                            this.cargarUsuarios();

                             Swal.fire(
                            'Excelente',
                            `${ usuario.nombre } fue eliminado correctamente`,
                            'success'
                          );                          
                          })

       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se elimino el usuario',
          'error'
        )
      }
    })
  }


  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario( usuario ).subscribe( resp => {
      console.log( resp );
    })
  }

  abrirModal( usuario: Usuario ){
    this.imagenService.abrirModal('Usuarios',usuario.uid, usuario.imagen);
  }

}
