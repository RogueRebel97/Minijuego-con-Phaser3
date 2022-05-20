import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../user/user-model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GameService {
  private id = this.cookieService.get('id')

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  sendScore(score: number) {
    console.log(`Score enviado desde Phaser: ${score}`);

    console.log(`score: ${score}
    id: ${this.id}`);

    return this.http.post("http://localhost/backend/user/postScore.php", { score: score, id: this.id });

  }

  getScoreboard() {
    return this.http.get<UserModel>("http://localhost/backend/web/getRecords.php");
  }

  getId() {
    return this.id
  }




}
