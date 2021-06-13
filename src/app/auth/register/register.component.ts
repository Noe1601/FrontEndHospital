import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, 
  {
    Validators: this.passwordsIguales('password', 'password2')
  }
  );

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router ) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
     return
    }

    this.usuarioService.crearUsuario( this.registerForm.value )
                        .subscribe( resp => {
                          Swal.fire('Excelente','Usuario registrado exitosamente','success')
                          console.log(resp);

                          //this.router.navigateByUrl('/');
                        }, (err) => {
                          // Si sucede un error
                          Swal.fire('Error',err.error.msg,'error')
                        })
  }

  campoNoValido( campo: string): boolean{
    if( this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formgroup: FormGroup ) => {

      const pass1Control = formgroup.get(pass1Name);
      const pass2Control = formgroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true })
      }

    }
  }

}
