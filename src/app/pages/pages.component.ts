import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private servicio: SettingsService, private sidebar: SidebarService ) { }

  ngOnInit(): void {
    customFunction();
    this.sidebar.cargarMenu();
  }

}
