import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-alumno',
  templateUrl: './create-alumno.component.html',
  styleUrls: ['./create-alumno.component.css']
})
export class CreateAlumnoComponent implements OnInit {

  public formAlumno: FormGroup;
  public formValidatorStatus: Boolean;
  public modalReference: NgbModalRef;

  get formValidator(){ return this.formAlumno.controls; }

  constructor( 
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.inicializator();
  }

  inicializator() {
    this.formValidatorStatus = false;
    this.inicializatorFormAlumno();
  }

  inicializatorFormAlumno(){
    this.formAlumno= this.formBuilder.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      contacto:['',[Validators.required, Validators.minLength(9)]]
    })
  }
  
  saveSubmitAlumno(){
    console.log(this.formAlumno.value);
    return
    this.formValidatorStatus = true;
    if (this.formAlumno.invalid){
      return;
    }
    this.saveAlumno();
  }

  saveAlumno() {

    this.modalReference.close();
  }

  callModalService(mdAlumno){
    this.modalReference = this.modalService.open(mdAlumno, { size: 'lg', backdrop: 'static' });
  }

}
