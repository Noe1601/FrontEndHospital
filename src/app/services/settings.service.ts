import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private LinkTheme = document.querySelector('#theme');

  constructor() { 
    const data = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.LinkTheme.setAttribute('href',data);
  }

  changeTheme( theme: string ){

    const url = `./assets/css/colors/${ theme }.css`
    this.LinkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url);
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    links.forEach( elemento => {
      elemento.classList.remove('working');
      const btnTheme = elemento.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.LinkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elemento.classList.add('working');
      }
    });
  }

}
