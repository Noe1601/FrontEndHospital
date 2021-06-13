import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public imagenService: ModalImagenService, public fileService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.imagenService.cerrarModal();
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

    const id = this.imagenService.id;
    const tipo = this.imagenService.tipo;
    
    this.fileService.actualizarFoto( this.imagenSubir, tipo, id)
        .then( img => {
          Swal.fire('Excelente','Imagen actualizada exitosamente','success');
          this.imagenService.nuevaImagen.emit( img );
          this.cerrarModal();
        }).catch( error => {
          Swal.fire('Lo sentimos','No se pudo subir la imagen','error');
        })     
  }

}
