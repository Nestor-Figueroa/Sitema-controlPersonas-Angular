import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { LogginService } from '../loggingService.service';
import { PersonasService } from '../personas.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  //Estamos consumiendo los servicios
  constructor(private personasService: PersonasService, private router:Router){}
  
  ngOnInit(): void {
 
    this.personasService.obtenerPersonas()
    .subscribe(
      res => {
        console.log("Respuesta DB: "+res)
        this.personas = <Persona[]>res;
        this.personasService.setPersonas(<Persona[]>res);
      },
      error => console.error(error)
      
    );
 
  }
  //Este metodo al presionar el boton nos redirige a la url del formulario
  agregar(){
    this.router.navigate(['personas/agregar'])
  }

}
