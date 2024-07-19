import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Persona} from '../../persona.model';
import { LogginService } from '../../loggingService.service';
import { PersonasService } from '../../personas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{
  
  nombreInput:string = '';
  apellidoInput:string = '';
  index: number;
  modoEdicion:number;

  //@ViewChild('nombreInput') nombreInput: ElementRef;
  //@ViewChild('apellidoInput') apellidoInput: ElementRef;
  //Se inyectan e inportan los servisio que practicamente son clases, y se agregan en una variable
  constructor(private loggingService:LogginService, 
    private personasService: PersonasService,
    private router: Router, private route: ActivatedRoute)
    {
      this.personasService.saludar.subscribe(
        (indice:number) => alert("El indice es: "+ indice)
      );
    }
  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];

    if(this.modoEdicion != null && this.modoEdicion === 1){
      let persona: Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  onGuardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    //this.loggingService.enviarMensajeAConsola("Enviamos Persona con nombre: " + persona1.nombre + " y apellido: "+persona1.apellido);
    //this.personaCreada.emit(persona1);
    if(this.modoEdicion != null && this.modoEdicion === 1){
      this.personasService.modificarPersona(this.index, persona1);
    }else{
      this.personasService.personaAgregada(persona1);
    }
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasService.eliminarPersona(this.index);
    }
    //Una vez eliminada la persona nos movemos a la ruta de la lista de personas
    this.router.navigate(['personas'])
  }
}
  
