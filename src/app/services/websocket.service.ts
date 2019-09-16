import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { Observable } from 'rxjs';
import { usuario } from '../classes/usuario.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus : boolean = false;
  public usuario:usuario;
  constructor(
    private ngx_socket: Socket,
    private router:Router
  ) { 
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){    

    this.ngx_socket.on('connect', ()=>{
      console.log('Conectado al servidor')
      this.socketStatus = true;
      this.cargarStorage();
    })


    this.ngx_socket.on('disconnect', ()=>{
      console.log('Desconectado del servidor')
      this.socketStatus = false;
    })
  }

  emit( evento:string, payload?:any, callbakc?:Function){
    this.ngx_socket.emit( evento, payload, callbakc);
  }

  listen(evento:string ){
    return this.ngx_socket.fromEvent(evento);
  }

  loginWS( nombre: string){
    return new Promise( (resolve, reject)=>{
      this.emit('configuracion-usuario', { nombre }, ( resp )=>{
        console.log(resp)
        this.usuario = new usuario(nombre)
        this.guardarStorage();
        resolve();
      })
    })    
  }

  logoutWS(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    this.emit('configuracion-usuario', { nombre:'sin-nombre' }, ( resp )=>{
      console.log(resp)                  
    })
    this.router.navigateByUrl('/')
  }

  getUsuario(){
    return this.usuario;
  }
  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }

  cargarStorage(){
    if (localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
      this.loginWS(this.usuario.nombre);
    }

  }
}
