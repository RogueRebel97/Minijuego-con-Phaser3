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
  private _check: boolean = false;

  constructor(private router: Router, private signinService: SigninService, private userService: UserService) { }

  ngOnInit(): void { }

  public submit() {
    //console.log(
    //   `usuario: ${this.user} contraseña: ${this.password} rep.contr: ${this.repassword}`
    // );

    var userInput: any = document.getElementById('user');

    if (this.validar()) {
      if (this.signinService.userAvailible(this.user).subscribe((data) => {
        if (data == '0') {
          alert('Usuario no disponible');
          userInput.focus();
        } else {
          this.signinService.signin(this.user.toUpperCase(), this.password).subscribe(data => {
            //console.log(data);
            alert('Usuario creado correctamente');
            this.userService.userLogin(this.user, this.password).subscribe(data => {
              if (data.nombre) {

                this.router.navigate(["/landing"]);
              }

            });

          });


        }
      })) {
      }
    } else {
      alert('Rellena correctamente todos los campos');
    }
  }

  public validate(event: Event) {

    var userError: any = document.getElementById('userError');
    var passError: any = document.getElementById('passError');
    var repassError: any = document.getElementById('rePassError');

    //console.log(this.user.length);

    var target = event.target as HTMLTextAreaElement;
    //console.log(target.id);
    //console.log(target);
    //console.log(event);

    if (target.id == "user") {
      if (target.value.length != 3) {

        userError.textContent = "El Usuario debe contener 3 caracteres unicamente";

      }
      else {
        userError.textContent = "";

      }
    }
    if (target.id == "password") {
      if (target.value.length < 3) {

        passError.textContent = "La contraseña debe tener al menos 3 caracteres";
      }
      else {
        passError.textContent = "";

      }

    }
    if (target.id == "rePassword") {
      if (this.repassword != this.password) {

        repassError.textContent = "Ambas contraseñas deben coincicidir";
      }
      else {
        repassError.textContent = "";

      }
    }

  }

  public onChange() {
    const check: any = document.getElementById('check');
    const checkError: any = document.getElementById('checkError');
    const registrarte: any = document.getElementById('submit');

    if (check.checked) {
      //console.log('checked');
    } else {
      //console.log('unchecked');
    }
  }

  public validar() {
    if (this.user.length < 3) {
      return false;
    } else {
      if (this.password.length < 3) {
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
