import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../user/user-model';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class GameService {
  private id = this.cookieService.get('id')

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  sendScore(score: number) {
    //console.log(`Score enviado desde Phaser: ${score}`);

    //console.log(`score: ${score}
    // id: ${this.id}`);

    return this.http.post(environment.baseUrl + "/backend/user/postScore.php", { score: score, id: this.id });

  }

  getScoreboard() {
    return this.http.get<UserModel>(environment.baseUrl + "/backend/web/getRecords.php");
  }

  getId() {
    this.id = this.cookieService.get('id')
    return this.id
  }




}
