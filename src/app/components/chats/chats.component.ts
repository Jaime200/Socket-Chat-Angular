import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {

  public texto:string = ''
  private mensasSubscription: Subscription;
  mensajesArr: any[] = [];
  @ViewChild('chat-mensajes') chatBox: ElementRef;
  elemento: HTMLElement
  
  constructor(
    private _wsService : WebsocketService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensasSubscription = this._wsService
                                  .listen('mensaje-nuevo')
                                  .subscribe(msg =>{
                                    console.log(msg);
                                    this.mensajesArr.push(msg);
                                    
                                    setTimeout(() => {
                                      this.elemento.scrollTop = this.elemento.scrollHeight;
                                  }, 50); 
                                  },
                                  (err)=>{},
                                  ()=>{             
                                    console.log('completado');                       
                                    this.elemento.scrollTop = this.elemento.scrollHeight;
                                  }
                                  )
  }

  ngOnDestroy(){
    this.mensasSubscription.unsubscribe();
  }

  enviar(){    
    const payload = {
      de: this._wsService.getUsuario().nombre,
      cuerpo: this.texto
    }
    this._wsService.emit('mensaje',payload)
    this.texto = ''
  }

}
