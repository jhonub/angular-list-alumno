import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { ListAlumnoComponent } from './alumno/list-alumno/list-alumno.component';
import { CreateAlumnoComponent } from './alumno/create-alumno/create-alumno.component';
import { DeleteAlumnoComponent } from './alumno/delete-alumno/delete-alumno.component';



@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ListAlumnoComponent,
    CreateAlumnoComponent,
    DeleteAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
