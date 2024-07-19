import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { LoginService } from './login/login.service';

//Este servicio se encargara de la comunicacion con la base de datos
@Injectable()
export class DataServices{
    //Se crea un objeto para utilizar el servicio
    constructor(private httpClient:HttpClient, private loginService: LoginService){}

    //Metodo cargar personas
    cargarPersonas(){
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://listado-de-personas-3b262-default-rtdb.firebaseio.com/datos.json?auth='+token);
    }

    //Metodo guardar personas
    guardarPersonas(personas: Persona[]){
        const token = this.loginService.getIdToken();
        this.httpClient.put('https://listado-de-personas-3b262-default-rtdb.firebaseio.com/datos.json?auth='+token,personas)
        .subscribe(
            response =>console.log('resultado de guardar las Personas'+response),
            error => console.log('Error al guardar personas' + error),
        );
    }

    modificarPersona(index:Number, persona:Persona){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-de-personas-3b262-default-rtdb.firebaseio.com//datos/' + index + '.json?auth='+token;
        this.httpClient.put(url, persona).
        subscribe(
            res => console.log("Resultado modificar Persona: "+res),
            error => console.log("Error en modificar Persona: "+ error)
        )
    }

    eliminarPersona(index:Number){
        const token = this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-de-personas-3b262-default-rtdb.firebaseio.com//datos/' + index + '.json?auth'+token;
        this.httpClient.delete(url).
        subscribe(
            res => console.log("Resultado eliminar Persona: "+res),
            error => console.log("Error en eliminar Persona: "+ error)
        )
    }
            
}