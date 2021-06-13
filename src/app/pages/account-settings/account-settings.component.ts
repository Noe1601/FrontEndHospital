import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

 
  constructor( private servicio: SettingsService ) { }

  ngOnInit(): void {
    this.servicio.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    this.servicio.changeTheme( theme ); 
    this.servicio.checkCurrentTheme();
  }

  

}
