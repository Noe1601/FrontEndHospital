import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto( archivo: File, tipo: 'Usuarios'|'Medicos'|'Hospitales', id: string){

    try{

      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })


      const data = await resp.json();

      if( data.ok ){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }


    }catch( error ){
      Swal.fire('Lo sentimos',`${error}`,'error');
      return false;
    }
  }

}
