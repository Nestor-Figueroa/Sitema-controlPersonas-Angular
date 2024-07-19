import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from 'firebase/auth';

//Servicio para autenticarnos con la base de datos 
@Injectable()
export class LoginService{
    token: string | null;

    constructor(private router: Router){}
    
    //Metodo de login para procesar el email y el password obteniendo un token 
    //y luego redirijiendo usando routing a la pagina de inicio
    login(email:string, password: string){
        const auth = firebase.getAuth();
        firebase.signInWithEmailAndPassword(auth, email, password)
        .then(
            response=>{
                firebase.getAuth().currentUser?.getIdToken().then(
                    token =>{
                        this.token =token;
                        this.router.navigate(['/']);
                    }
                )
            }
        ) 
    }

    getIdToken(){
        return this.token;
    }

    isAutenticado(){
        return this.token != null;
    }

    logout(){
        firebase.getAuth().signOut().then(() =>{
            this.token = "";
            this.router.navigate(['login']);
        }).catch(error => console.log("error de logout" + error));
    }
}