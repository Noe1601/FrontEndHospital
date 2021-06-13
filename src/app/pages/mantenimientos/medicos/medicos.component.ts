import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private servicio: MedicoService, private imagenService: ModalImagenService, 
    private busquedaService: BusquedasService ) { }

    ngOnDestroy(): void{
      this.imgSubs.unsubscribe();
    }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imagenService.nuevaImagen.pipe(
      delay(100)).subscribe( resp => {
        this.cargarMedicos();
      })
  }

  cargarMedicos(){
    this.cargando = true;
    this.servicio.cargarMedicos().subscribe( resp => {
      this.medicos = resp;
      this.cargando = false;
    })
  }


  abrirModal( medico: Medico ){
    this.imagenService.abrirModal('Medicos', medico._id, medico.imagen);
  }

  buscarMedicos( termino: string ){

    if( termino.length === 0 ){
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe( resp => {
      this.medicos = resp;
    })

  }


  borrarMedicos( medico: Medico ){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicio.eliminarMedicos( medico._id ).subscribe(
          resp => {
            this.cargarMedicos();
            
            Swal.fire(
              'Excelente',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );  
          }
        )
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se elimino el medico',
          'error'
        )
      }
    })


  }

}
