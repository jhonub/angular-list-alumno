import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-alumno',
  templateUrl: './list-alumno.component.html',
  styleUrls: ['./list-alumno.component.css']
})
export class ListAlumnoComponent implements OnInit {

  public listAlumnos: any;
  public listCursos:any;

  constructor() { }

  ngOnInit() {
    this.inicializator();
  }

  inicializator() {
    this.listAlumnos = [];
    this.validatorDataLocalSorage();
    this.listCursosQuery();
  }

  validatorDataLocalSorage() {
    let data = localStorage.getItem('data');
    if(data == null) {
      this.listAlumnos = [];
    } else {
      this.listAlumnos = JSON.parse(data);
    }
  }
  listCursosQuery(){
    this.listCursos=[
      {id:1,nombre:'Matematica'},
      {id:2, nombre:'Comunicacion'},
      {id:3, nombre:'Fisica'}
    ]
  }
  validatorEmitAlumno(alumno) {
    this.listAlumnos.push(alumno);
  }

  validatorReload() {
    this.inicializator();   
  }
  delete(){
    
  }

}
 