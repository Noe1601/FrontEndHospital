import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private fileService: FileUploadService ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.required, Validators.email]]
    });

  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.profileForm.value )
                        .subscribe( () => {
                          const { nombre, email } = this.profileForm.value;
                           this.usuario.nombre = nombre;
                           this.usuario.email = email;
                           Swal.fire('Excelente','Usuario actualizado exitosamente','success')
                        }, (error) => {
                          Swal.fire('Lo sentimos',error.error.msg,'error')
                        })
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if( !file ){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log( reader.result );
    }

    
  }

  subirImagen(){
    
    this.fileService.actualizarFoto( this.imagenSubir, 'Usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.imagen = img;
          Swal.fire('Excelente','Imagen actualizada exitosamente','success');
        }).catch( error => {
          Swal.fire('Lo sentimos','No se pudo subir la imagen','error');
        })     
  }

}
