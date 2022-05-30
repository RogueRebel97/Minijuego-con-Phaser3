import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../user-model';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class SigninService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }




  public signin<UserModel>(username: string, password: string) {
    //console.log(`Usuario: ${username} Contraseña: ${password}`);
    return this.http.post(environment.baseUrl + "/backend/user/post.php", { nombre: username, password: password });

  }


  // Comprobar Disponibilidad de Nombre de Usuario, return 0 si es false o 1 si es true
  public userAvailible(username: string) {
    //console.log(`Usuario a comprobar: ${username}`);
    return this.http.post(environment.baseUrl + "/backend/user/usernameCheck.php", { nombre: username });

  }


}
