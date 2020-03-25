import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { IChatRoom, KiiSocketService, SocketEvents, ChatDataType, IChatMessage } from 'src/app/routes/chat/service/kii-socket.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { faUserClock } from '@fortawesome/free-solid-svg-icons/faUserClock';
import { KiiChatDialogComponent } from '../../components/kii-chat-dialog/kii-chat-dialog.component';

@Component({
  selector: 'kii-admin-chats',
  templateUrl: './kii-admin-chats.component.html',
  styleUrls: ['./kii-admin-chats.component.scss']
})
export class KiiAdminChatsComponent extends KiiBaseAbstract implements OnInit {

  icons = {
    clock: faUserClock
  }

  rooms : IChatRoom[] = [];
  currentRoom: IChatRoom;
  
  initialStatus:boolean = true;

  constructor(
    private translate: KiiTranslateService,
    private kiiSocket: KiiSocketService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: any) { super() }

  ngOnInit() {
    this.translate.setRequiredContext(['main','auth','form','admin']);

    //Ask for all current open rooms
    this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:null, type:ChatDataType.WaitingRooms, object:null});
    
    this.addSubscriber(
      this.kiiSocket.onDataChange().subscribe(res => {
        console.log("Recieved data change:",res);
        if (res) {
          switch (res.type) {
            case ChatDataType.WaitingRooms:
                this.rooms = res.object.rooms;
                this.currentRoom = res.object.rooms[0];
                //Ask for the messages of the first client of the room
                for (let room of this.rooms) {
                  this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:room.id, type:ChatDataType.StoredMessagesRequest, object:null});
                }
                break;
            case ChatDataType.StoredMessagesResponse:
                let myRoomIndex = this.rooms.findIndex(obj=> obj.id == res.room);
                if (myRoomIndex>=0) {
                  this.rooms[myRoomIndex].messages = res.object.messages; 
                  this.rooms[myRoomIndex].language = res.object.language;
                }
                break;
            default:
              break;   
          }    
        }

      })
    )
  }

  openRoom(room:IChatRoom) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentRoom = room;
      this.kiiSocket.socket.emit(SocketEvents.CHAT_DATA,{room:this.currentRoom.id, type:ChatDataType.JoinRoom, object:{room:this.currentRoom}});
      let dialogRef = this.dialog.open(KiiChatDialogComponent, {
        panelClass: 'kii-chat-dialog',
        minWidth:'300px',
        maxWidth:'500px',
        width:'80vw',
        data:  {messages:this.currentRoom.messages,room:this.currentRoom, isAdmin:true} 
      });
      dialogRef.afterClosed().subscribe(result => {
         //Leave all rooms
         this.kiiSocket.chatLeave(result);

      });
    }
  }

  /**Remove any bot counts */
  countMessages(messages:IChatMessage[]) {
      return messages.filter(obj=> obj.isBot == false).length;
  }


}
