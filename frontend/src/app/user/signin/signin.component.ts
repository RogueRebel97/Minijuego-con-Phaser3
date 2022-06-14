import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  private _user: string = '';
  private _password: string = '';
  private _repassword: string = '';
  private _userError: string = '';

  private userRegex = new RegExp(/^[a-zA-Z]{3,4}$/);
  private passRegex = new RegExp(/^[A-Za-z0-9]{3,5}/);

  msg: string = '';
  show: boolean = false;


  constructor(private router: Router, private signinService: SigninService, private userService: UserService) { }

  ngOnInit(): void { }

  public submit() {
    //console.log(
    //   `usuario: ${this.user} contraseña: ${this.password} rep.contr: ${this.repassword}`
    // );

    // Coger usuario
    var userInput: any = document.getElementById('user');


    if (this.validar()) {
      if (this.signinService.userAvailible(this.user).subscribe((data) => {
        if (data == '0') {
          // alert('Usuario no disponible');
          this.msg = "Usuario no disponible"
          this.show = true

          setTimeout(() => {
            this.show = false
          }, 2000);

          userInput.focus();

        }
        else {
          this.signinService.signin(this.user.toUpperCase(), this.password).subscribe(data => {
            //console.log(data);
            // alert('Usuario creado correctamente');
            this.msg = "Usuario creado correctamente"
            this.show = true

            setTimeout(() => {
              this.show = false
            }, 2000);

            this.userService.userLogin(this.user, this.password).subscribe(data => {
              if (data.nombre) {
                this.router.navigate(["/minijuego"]);
              }

            });

          });


        }
      })) {
      }
    } else {
      // alert('Rellena correctamente todos los campos');
      this.msg = "Rellena correctamente todos los campos"
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000);

    }
  }

  //Funcion que se ejecuta cada vez que el usuario escribe un caracter y muestra los mensajes de error
  public validate(event: Event) {

    var userError: any = document.getElementById('userError');
    var passError: any = document.getElementById('passError');
    var repassError: any = document.getElementById('rePassError');

    //console.log(this.user.length);

    var target = event.target as HTMLTextAreaElement;
    //console.log(target.id);
    //console.log(target);
    //console.log(event);

    //Validacion de Usuario, comprobar longitud
    if (target.id === "user") {
      if (this.userRegex.test(this.user) == false) {
        userError.textContent = "El Usuario debe contener entre 3 y 4 letras";
      }
      else {
        userError.textContent = "";
      }
    }
    //Validacion de Password, comprobar longitud
    if (target.id === "password") {
      if (this.passRegex.test(this.password) == false) {

        passError.textContent = "La contraseña debe tener entre 3 y 5 caracteres";
      }
      else {
        passError.textContent = "";
      }

    }

    //Validacion de RepeatPassword, comprobar coincidenciaa
    if (target.id == "rePassword") {
      if (this.repassword != this.password) {

        repassError.textContent = "Ambas contraseñas deben coincicidir";
      }
      else {
        repassError.textContent = "";

      }
    }

  }

  // Valida que la informacion enviada por el usuario sea correcta
  public validar() {

    if (this.userRegex.test(this.user) == false) {
      return false;
    } else {

      if (this.passRegex.test(this.password) == false) {
        return false;
      } else {
        if (this.repassword != this.password) {
          return false;
        }
        return true;
      }
    }
  }

  //Gets & Sets
  get user(): string {
    return this._user;
  }
  get password(): string {
    return this._password;
  }
  set user(data: string) {
    this._user = data;
  }
  set password(data: string) {
    this._password = data;
  }

  get repassword(): string {
    return this._repassword;
  }

  set repassword(data: string) {
    this._repassword = data;
  }

  get userError(): string {
    return this._userError;
  }
  set userError(data: string) {
    this._userError;
  }
}
