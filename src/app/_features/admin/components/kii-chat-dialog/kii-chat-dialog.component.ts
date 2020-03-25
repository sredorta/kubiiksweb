import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChatRoom, IChatMessage } from 'src/app/routes/chat/service/kii-socket.service';
import { KiiChatComponent } from 'src/app/routes/chat/kii-chat/kii-chat.component';

@Component({
  selector: 'kii-chat-dialog',
  templateUrl: './kii-chat-dialog.component.html',
  styleUrls: ['./kii-chat-dialog.component.scss']
})
export class KiiChatDialogComponent implements OnInit {
  isAdmin:boolean;
  messages:IChatMessage[] = [];

  room: IChatRoom = {id:null,    
    participants:0,
    date:new Date(),
    messages: [],
    language: environment.languages[0]};

    subscrition : Subscription = new Subscription();

    @ViewChild(KiiChatComponent, {static:false}) chat : KiiChatComponent;

  constructor(public dialogRef: MatDialogRef<KiiChatDialogComponent>,@Inject(MAT_DIALOG_DATA) data:any) { 
      if (data) {
        if (data.isAdmin) this.isAdmin = data.isAdmin;
        if (data.messages)this.messages = data.messages;
        if (data.room) this.room = data.room;
      }
    }

  ngOnInit() {
    //Send stats
    this.dialogRef.disableClose = false;//disable default close operation
    this.subscrition = this.dialogRef.beforeClose().subscribe(result => {
      this.dialogRef.close(this.chat.room);
    });
  }

  ngOnDestroy() {
    if (this.subscrition) this.subscrition.unsubscribe();
  }

}
