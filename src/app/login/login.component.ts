import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  //Metodo de login del component.html
  login(form: NgForm){
    //Constatnes para procesar los elementos del formulario
    const email = form.value.email;
    const password = form.value.password;
    this.loginService.login(email,password);
  }

}
