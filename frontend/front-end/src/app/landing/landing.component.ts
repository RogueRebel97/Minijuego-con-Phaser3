import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public cookie:any;
  constructor( private cookieService:CookieService) { }

  
  ngOnInit(): void {

this.cookie=this.cookieService.get("id"); 



  }

}
