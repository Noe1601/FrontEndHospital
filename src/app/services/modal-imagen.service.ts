import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _mostrarModal: boolean = true;
  public tipo: 'Usuarios'|'Medicos'|'Hospitales';
  public id: string;
  public imagen: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  

  get mostrarModal(){
    return this._mostrarModal;
  }

  abrirModal(tipo: 'Usuarios'|'Medicos'|'Hospitales', id: string, imagen: string = 'no-image'){
    this._mostrarModal = false;
    this.tipo = tipo;
    this.id = id;
    //this.imagen = imagen

    if( imagen.includes('https') ){
      this.imagen = imagen;
    }else{
      this.imagen = `${ base_url }/upload/${ tipo }/${ imagen }`
    }
  }

  cerrarModal(){
    this._mostrarModal = true;
  }

  constructor() { }
}
