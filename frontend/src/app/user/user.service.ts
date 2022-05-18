import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { UserModel } from './user-model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public userLogin(name: string, password: string) {
    console.log('Datos Recibidos desde Usuario: ' + name, password);

    return this.http
      .post<UserModel>('http://localhost/backend/user/get.php', {
        nombre: name,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user.nombre) {
            this.cookieService.set('id', user.id);
          }

          return user;
        })
      );
  }
  public isLogged() {
    return this.cookieService.get('id');
  }

}
