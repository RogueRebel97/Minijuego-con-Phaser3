import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../user/user-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GameService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  sendScore(score: number) {
    console.log(`Score enviado desde Phaser: ${score}`);

    var id = this.cookieService.get('id');
    console.log(`score: ${score}
    id: ${id}`);

    return this.http.post("http://localhost/backend/user/postScore.php", { score: score, id: id });







  }






}
