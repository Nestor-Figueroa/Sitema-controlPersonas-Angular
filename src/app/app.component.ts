import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import * as firebase from 'firebase/app';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titulo = 'Listado de Personas';
  personas: Persona[] = [];

  //constructor(private logginService: LogginService, private personasService: PersonasService){}
  constructor(private loginService: LoginService){}
  
  ngOnInit(): void {
    //this.personas = this.personasService.personas;
    //Configurar firebase
    //Inicializsando firebase como un objeto
    firebase.initializeApp({
      apiKey: "AIzaSyDCKzPJxKwKo1b2cgiglIYAoMhufO63OPo",
      authDomain: "listado-de-personas-3b262.firebaseapp.com"
    })
  }
  
  isAutenticado(){
    return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }

}
 
