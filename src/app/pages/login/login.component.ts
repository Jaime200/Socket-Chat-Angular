import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre : string = '';

  constructor(
    public wsService : WebsocketService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  ingresar(){
    console.log('hola mundo ',this.nombre);
    this.wsService.loginWS(this.nombre).then(
      ()=>{ this.router.navigate(['mensajes'])}
    );
  }

}
