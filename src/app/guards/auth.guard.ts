import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private servicio: UsuarioService, private router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.servicio.validarToken().pipe(
        tap( isAuth => {
          if( !isAuth ){
            this.router.navigateByUrl('/login');
          }
        })
      );

      //console.log('Paso por el activated del guard');

    //return true;
  }
  
}
