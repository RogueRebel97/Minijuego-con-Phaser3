import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';



  constructor(private router: Router, private userService:UserService, private cookieService:CookieService) {}


  public logged()
  {
  if(this.userService.isLogged()){
    
    return true;
  
  }
  else
  {
   
    return false;
  }
  }

public logout()
{
this.cookieService.delete("id");
alert("logout")
this.router.navigate(["/login"])

}


}
