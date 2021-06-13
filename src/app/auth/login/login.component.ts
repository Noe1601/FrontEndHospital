import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare var gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('check') || false]
  });

  ngOnInit(){
    this.renderButton();
  }

  Login(){

    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {
                          if( this.loginForm.get('remember').value ){
                            localStorage.setItem('email', this.loginForm.get('email').value);
                            localStorage.setItem('check', this.loginForm.get('remember').value);
                          }else{
                            localStorage.removeItem('email');
                            localStorage.removeItem('check');
                          }

                          this.router.navigateByUrl('/')

                        }, (err) => {
                          Swal.fire('Error', err.error.msg, 'error')
                        })
    //console.log( this.loginForm.value )

    // this.router.navigateByUrl('/');
  }

  onSuccess( googleUser ){
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);
  }
  
  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }
}
