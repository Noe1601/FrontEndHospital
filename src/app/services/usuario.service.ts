import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap,map, catchError,delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router ) { }

  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  validarToken(): Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.Token
      }
    }).pipe(
      map( (resp: any) => {

        const {email,google,nombre,imagen = '',role,uid} = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', imagen, google, role, uid);

        //this.usuario.ImprimirUsuario();
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),
      catchError( error => of(false) )
    )
  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`,formData) 
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token',resp.token)
      })
    );

  }

  actualizarPerfil( data: {email: string, nombre: string, role: string} ){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${ this.uid }`,data, this.headers )
  }

  login( formData: LoginForm){
    return this.http.post(`${ base_url}/login`,formData)
                    .pipe(
                      tap( (resp: any) => {
                        this.guardarLocalStorage(resp.token,resp.menu);
                      })
                    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }


cargarUsuario( desde: number = 0 ){
  return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${ desde }`, this.headers )
              .pipe(
                delay(500),
                map( resp => {
                  const usuarios = resp.usuarios.map( 
                    user => new Usuario(user.nombre,user.email,'', user.imagen, user.google, user.role, user.uid )
                    )
                  return {
                    usuarios,
                    totalUsuarios: resp.totalUsuarios
                  }
                })
              )

}


eliminarUsuario( usuario: Usuario ){
  return this.http.delete(`${ base_url }/usuarios/${ usuario.uid }`,this.headers);
}

guardarUsuario( usuario: Usuario){

  return this.http.put(`${base_url}/usuarios/${ usuario.uid }`,usuario, this.headers );

}


}
