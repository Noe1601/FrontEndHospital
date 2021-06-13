import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor( private fb: FormBuilder, private hospitalService: HospitalesService,
      private medicoService: MedicoService, private router: Router, private activated: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activated.params.subscribe( ({ id }) => this.cargarMedico( id ))

    this.cargarHospital();

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
       this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
      }
    )
  }

  cargarHospital(){
    this.hospitalService.cargarHospitales().subscribe( 
      (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      }
    )
  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    // const { nombre, _id}

    if( this.medicoSeleccionado ){
      // actualizar

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedicos( data ).subscribe( resp => {
        Swal.fire('Excelente',`${ nombre } fue actualizado correctamente`, 'success');
      })
    }else{

      this.medicoService.crearMedicos( this.medicoForm.value ).subscribe( (resp: any) => {
        Swal.fire('Excelente',`${ nombre } fue creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`);
      })
    }


  }

  cargarMedico( id: string ){

    if( id === 'nuevo' ){
      return;
    }

    this.medicoService.obtenerMedicoPorId( id ).subscribe( medico => {

      if( !medico ){
        return this.router.navigateByUrl(`/dashboard/medicos`);
      }

      const { nombre, hospital: { _id }} = medico;
      this.medicoSeleccionado = medico;      
      this.medicoForm.setValue({ nombre, hospital: _id })
    })
  }

}
