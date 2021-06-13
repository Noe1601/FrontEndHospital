import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospital: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  public hospitalTemp: Hospital[] = [];

  constructor( private servicio: HospitalesService, private imagenService: ModalImagenService,
            private busquedaService: BusquedasService ) { }

  ngOnDestroy(): void{
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargando = true;
    this.cargarHospitales();
    this.imgSubs = this.imagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe( img => this.cargarHospitales() )
  }

  cargarHospitales(){
    this.servicio.cargarHospitales().subscribe(
      hospitales => {
        this.cargando = false;
        this.hospital = hospitales;
        this.hospitalTemp = hospitales;
      }
    )
  }

  actualizarHospital( hospital: Hospital ){
    this.servicio.actualizarHospital( hospital._id, hospital.nombre ).subscribe(
      resp => {
        this.cargarHospitales();
        Swal.fire('Excelente',`${ hospital.nombre } fue actualizado.`, 'success');
      });
  }

  eliminarHospital( hospital: Hospital ){
    this.servicio.eliminarHospital( hospital._id ).subscribe(
      resp => {
        this.cargarHospitales();
        Swal.fire( 'Excelente', `${ hospital.nombre } eliminado,`, 'success' );
      });
  }

  async abrirModal(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre de hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true
    })
    
   if( value.trim().length > 0 ){
     this.servicio.crearHospital( value ).subscribe( (resp: any) => {
       this.hospital.push( resp.hospital )
     })
   }
  }

  abrirModalImagen( hospital: Hospital ){

    this.imagenService.abrirModal('Hospitales', hospital._id, hospital.imagen );

  }


  BuscarHospital( termino: string ){

    if( termino.length === 0 ){
      return this.hospital = this.hospitalTemp
    }

    this.busquedaService.buscar('hospitales', termino ).subscribe( resp => {
      this.hospital = resp;
    })
  }

}
