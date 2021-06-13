import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuarios.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): any[]{

    return resultados.map(  
      user => new Usuario(user.nombre,user.email,'', user.imagen, user.google, user.role, user.uid ) 
      );

  }

  private transformarHospitales( resultados: any[] ): any[]{
    return resultados.map(
      hospital => new Hospital(hospital.nombre, hospital._id, hospital.imagen )
    )
  }

  private transformarMedicos( resultados: any[] ): any[]{
      return resultados;
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ){

    return this.http.get<any[]>(`${base_url}/todo/coleccion/${ tipo }/${ termino }`, this.headers )
                .pipe(
                  map( (resp:any) => {
                    switch (tipo) {
                      case 'usuarios':
                        return this.transformarUsuarios( resp.resultados );
                        break;

                      case 'hospitales':
                        return this.transformarHospitales( resp.resultados );
                        break;

                      case 'medicos':
                        return this.transformarMedicos( resp.resultados );
                        break;
                    
                      default:
                        return [];
                    }
                  })
                )
  }

}
