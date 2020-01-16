import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-alumno',
  templateUrl: './delete-alumno.component.html',
  styleUrls: ['./delete-alumno.component.css']
})
export class DeleteAlumnoComponent implements OnInit {

  public listAlumnos:any;
  public modalReference: NgbModalRef;
  constructor( private modalService: NgbModal ) { }
  @Input() idAlumno;
  @Input() typeButton;
  @Input() nameButton;
  @Output() modifyAlumno = new EventEmitter();
  
  ngOnInit() {
  }
  Inicializator(){
    this.listAlumnos = []; 
    this.inicalizatorLocalStorage();
  }
  
  inicalizatorLocalStorage() {
    let data = localStorage.getItem('data');
    if(data == null) {
      this.listAlumnos = [];
    } else {
      this.listAlumnos = JSON.parse(data);
    }
  }
  deleteAlumno(){
    this.listAlumnos.splice(this.idAlumno, 1)
    localStorage.setItem('data', JSON.stringify(this.listAlumnos))
    this.modifyAlumno.emit();
    this.modalReference.close();
  }
  
  callModalService(mdAlumno){
    this.Inicializator();
    this.modalReference = this.modalService.open(mdAlumno, { size: 'sm' });

  }
}
