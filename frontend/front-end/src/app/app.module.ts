import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './user/signin/signin.component';
import { CookieService } from 'ngx-cookie-service';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { Scene1 } from './game/scenes/Scene1';
import { LoadingScreen } from './game/scenes/LoadingScreen';
import { MainMenu } from './game/scenes/MainMenu';
import Settings from './game/scenes/Settings';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    LandingComponent,
    GameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CookieService, MainMenu, Scene1, LoadingScreen],
  bootstrap: [AppComponent],
})
export class AppModule {}
