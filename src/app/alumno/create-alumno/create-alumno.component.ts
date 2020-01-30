import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
  public listCursos:any;
  public search:any;
  public formatter:any;
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
    this.listCursosQuery();
    this.searchCursos();
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
      contacto:['',[Validators.required, Validators.minLength(9)]],
      cursos:['',[Validators.required]]
    })
  }

  inicializatorEditAlumno() {
    this.formAlumno.get('nombre').setValue(this.listAlumnos[this.idAlumno].nombre)
    this.formAlumno.get('apellido').setValue(this.listAlumnos[this.idAlumno].apellido)
    this.formAlumno.get('email').setValue(this.listAlumnos[this.idAlumno].email)
    this.formAlumno.get('contacto').setValue(this.listAlumnos[this.idAlumno].contacto)
    for(let curso of this.listCursos)
      if(curso.id == this.listAlumnos[this.idAlumno].idCurso){
       this.formAlumno.get('cursos').setValue(curso);
      }
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

  listCursosQuery(){
    this.listCursos=[
      {id:1,nombre:'Matematica'},
      {id:2, nombre:'Comunicacion'},
      {id:3, nombre:'Fisica'}
    ]
  }
  searchCursos(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.listCursos.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  this.formatter = (x: {nombre: string}) => x.nombre;
  }

  saveAlumno() {
    this.listAlumnos.push(this.validatorRestrucJson());
    localStorage.setItem('data', JSON.stringify(this.listAlumnos))
    this.modifyAlumno.emit(this.validatorRestrucJson());
    this.modalReference.close();
  }

  updateAlumno() {
    this.listAlumnos[this.idAlumno].idCurso = this.formAlumno.value.cursos.id;
    this.listAlumnos[this.idAlumno].nombre = this.formAlumno.value.nombre;
    this.listAlumnos[this.idAlumno].apellido = this.formAlumno.value.apellido;
    this.listAlumnos[this.idAlumno].email = this.formAlumno.value.email;
    this.listAlumnos[this.idAlumno].contacto = this.formAlumno.value.contacto;
   
    localStorage.setItem('data', JSON.stringify(this.listAlumnos))
    this.modifyAlumno.emit(this.validatorRestrucJson());
    this.modalReference.close();
  }

  validatorRestrucJson() {
    let data = {
      nombre:this.formAlumno.value.nombre,
      apellido:this.formAlumno.value.apellido,
      email:this.formAlumno.value.email,
      contacto:this.formAlumno.value.contacto,
      idCurso:this.formAlumno.value.cursos.id
    }
    console.log(data);
    
    return data;
  }

  callModalService(mdAlumno){
    this.inicializator();
    this.modalReference = this.modalService.open(mdAlumno, { size: 'lg', backdrop: 'static' });
  }

}
