import { Injectable, Inject, PLATFORM_ID, NgZone, ChangeDetectorRef } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';


/**Enumerator with all socket events*/
export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  AUTHENTICATE = "authenticate",
  UPDATE_USER = "update-user-data",
  CHAT_ADMINS_DATA = "chat-admins",
  CHAT_DATA="chat-data",
    //CHAT_ADMIN_ROOMS="chat-admin-rooms",
  //CHAT_NEW_NOTIFY ="chat-new-notify",
}

/**Socket auth data format */
export interface ISocketToken {
  token:string|null;
}

export interface ISocketLanguage {
  language:string;
}

/**Socket auth data format*/
export interface ISocketAuth extends ISocketToken, ISocketLanguage {
}

/**Chat message data format */
export interface IChatMessage {
  message:string;
  date:Date;  
  sender:string;
  room:string;
  isBot:boolean;
  senderName:string | null,
}

export interface IChatUser {
  userId:number;
  firstName:string;
  avatar:string;
  connected:boolean;
}

/**Room structure */
export interface IChatRoom {
    id:string;
    participants:number;
    date:Date;
    messages: IChatMessage[];
    language:string;
}

  /**Chat data structure */
export  interface IChatData {
    room:string | null;
    type:ChatDataType;
    object:any;
}

export enum ChatDataType {
     CreateRoom = "create-room",
     FirstMessage = "first-message",
     WaitingRooms = "waiting-rooms",
     JoinRoom = "join-room",
     LeaveRoom = "leave-room",
     StoredMessagesRequest = "stored-messages-request",
     StoredMessagesResponse = "stored-messages-response",
     Participants = "room-participants",
     Message = "message",
     Room = "room",
     Writting = "writting"
}



@Injectable({
  providedIn: 'root'
})
export class KiiSocketService {
  /**Socket for comunication */
  socket = io();


  /**Chat admins */
  private _chatAdmins:Array<IChatUser> = [];
  private _chatAdmins$ = new BehaviorSubject<IChatUser[]>([]); 

  /**Data provided by socket */
  private _data$ = new BehaviorSubject<IChatData>(null);


  constructor(
              private translate: KiiTranslateService,
              private ngZone: NgZone,
              @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(platformId)) {
      //Start socket outside from Angular zone to fix issue #9098
      this.ngZone.runOutsideAngular(() => {
        this.socket = io(environment.mainExtURL,{secure:true});
      });
      this.loadOnChatData();        //Interface for all socket room to room data
    }
  }



  ////////////////////////////////////////////////////////////////////////
  //Functions for handling socket events
  ////////////////////////////////////////////////////////////////////////

  /**Loads chat data */
  private loadOnChatData() {
    this.socket.on(SocketEvents.CHAT_DATA, (data:IChatData) => {
      //console.log("Recieved CHAT_DATA",data);
      this.ngZone.run((status: string) => {
           this._data$.next(data);
      })   
    });
  }

  /**Sends chat data to the room */
  sendChatData(data:IChatData) {
    this.socket.emit(SocketEvents.CHAT_DATA,data);
  }

  getChatAdmins() {
    this.socket.emit(SocketEvents.CHAT_ADMINS_DATA);
  }

  chatStart() {
    this.socket.emit(SocketEvents.CHAT_DATA, {room:null, type:ChatDataType.CreateRoom, object:{language:this.translate.get()}});
  }

  /**Leaves all the chats */
  chatLeave(room:IChatRoom) {
    this.socket.emit(SocketEvents.CHAT_DATA,{room:null, type:ChatDataType.LeaveRoom, object:{room:room}});
    this._data$.next(null);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  // OBSERVABLES
  /////////////////////////////////////////////////////////////////////////////////////////////

  /**Returns data when recieved by socket */
  onDataChange() {
    return this._data$;
  }

  /**Returns chat admins */
  onChatAdmins() {
    return this._chatAdmins$;
  }




}