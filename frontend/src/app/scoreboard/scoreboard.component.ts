import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  public records!: any //Json de records recibidos desde la BD atraves del PHP
  public cookie!: any


  constructor(private gameService: GameService, private cookieService: CookieService) { }

  ngOnInit(): void {

    //show Personal Score
    this.cookie = this.cookieService.get("id");



    // Show scoreboard
    this.gameService.getScoreboard().subscribe((data) => {
      if (data) {
        console.log(data);
        this.records = data
      }
      else {
        console.log("no se han recibido records");
      }
    })



  }





}
