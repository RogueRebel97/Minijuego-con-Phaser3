import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  private _user: string = "";
  private _password: string = "";

  msg: string = "";
  show: boolean = false;

  constructor(private router: Router, private userService: UserService) {


  }

  ngOnInit(): void {
  }

  submit() {
    this.userService.userLogin(this.user, this.password).subscribe(data => {
      //console.log(data);
      if (data.nombre) {

        this.router.navigate(["/minijuego"]);
      }
      else {
        //console.log("Usuario o Contraseña incorrectas");  
      }

    })

  }

  showChip() {
    this.msg = "Debes Iniciar Sesion Primero"
    this.show = true
  }

  get user(): string {
    return this._user
  }
  get password(): string {
    return this._password
  }
  set user(data: string) {
    this._user = data;
  }
  set password(data: string) {
    this._password = data;
  }




}
