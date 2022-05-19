import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth.guard';
import { SigninComponent } from './user/signin/signin.component';
import { UserComponent } from './user/user.component';
import { LandingComponent } from './landing/landing.component';
import { GameComponent } from './game/game.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  { path: "login", component: UserComponent, },
  { path: "signin", component: SigninComponent, },
  { path: "landing", component: LandingComponent, canActivate: [AuthGuard] },
  { path: "scoreboard", component: ScoreboardComponent, canActivate: [AuthGuard] },
  { path: "minijuego", component: GameComponent, canActivate: [AuthGuard] },
];

// canActivate:[AuthGuard] añadir a todas las rutas salvo login y signin. Comprueba si estas logedo antes de acceder a la ruta
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
