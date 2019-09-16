import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  
  constructor(
    public wsService:WebsocketService,
    private router:Router
    ){

  }
  canActivate():  boolean {
    if(this.wsService.getUsuario()){
      return true;
    }
    this.router.navigateByUrl('/')
    return false;
  }
}
