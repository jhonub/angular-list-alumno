import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-alumno',
  templateUrl: './create-alumno.component.html',
  styleUrls: ['./create-alumno.component.css']
})
export class CreateAlumnoComponent implements OnInit {

  @Input() idAlumno;
  @Input() typeButton;
  @Input() nameButton;
  @Output() modifyAlumno = new EventEmitter();

  public formAlumno: FormGroup;
  public formValidatorStatus: Boolean;
  public listAlumnos: any;
  public modalReference: NgbModalRef;

  get formValidator(){ return this.formAlumno.controls; }

  constructor( 
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    
  }

  inicializator() {    
    this.formValidatorStatus = false;
    this.listAlumnos = [];
    this.inicalizatorLocalStorage();
    this.inicializatorFormAlumno();
    if(this.idAlumno != null) {
      this.inicializatorEditAlumno();
    }
  }

  inicalizatorLocalStorage() {
    let data = localStorage.getItem('data');
    if(data == null) {
      this.listAlumnos = [];
    } else {
      this.listAlumnos = JSON.parse(data);
    }
  }

  inicializatorFormAlumno(){
    this.formAlumno= this.formBuilder.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      contacto:['',[Validators.required, Validators.minLength(9)]]
    })
  }

  inicializatorEditAlumno() {
    this.formAlumno.get('nombre').setValue(this.listAlumnos[this.idAlumno].nombre)
    this.formAlumno.get('apellido').setValue(this.listAlumnos[this.idAlumno].apellido)
    this.formAlumno.get('email').setValue(this.listAlumnos[this.idAlumno].email)
    this.formAlumno.get('contacto').setValue(this.listAlumnos[this.idAlumno].contacto)
  }
  
  saveSubmitAlumno(){
    this.formValidatorStatus = true;
    if (this.formAlumno.invalid){
      return;
    }
    if(this.idAlumno != null) {
      this.updateAlumno();
    } else {
      this.saveAlumno();
    }
    
  }

  saveAlumno() {
    this.listAlumnos.push(this.formAlumno.value);
    localStorage.setItem('data', JSON.stringify(this.listAlumnos))
    this.modifyAlumno.emit(this.formAlumno.value);
    this.modalReference.close();
  }

  updateAlumno() {
    this.listAlumnos[this.idAlumno].nombre = this.formAlumno.value.nombre;
    this.listAlumnos[this.idAlumno].apellido = this.formAlumno.value.apellido;
    this.listAlumnos[this.idAlumno].email = this.formAlumno.value.email;
    this.listAlumnos[this.idAlumno].contacto = this.formAlumno.value.contacto;

    localStorage.setItem('data', JSON.stringify(this.listAlumnos))
    this.modifyAlumno.emit(this.formAlumno.value);
    this.modalReference.close();
  }

  validatorRestrucJson() {
    let data = {

      
    }
    return data;
  }

  callModalService(mdAlumno){
    this.inicializator();
    this.modalReference = this.modalService.open(mdAlumno, { size: 'lg', backdrop: 'static' });
  }

}
