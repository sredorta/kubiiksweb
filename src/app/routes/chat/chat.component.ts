import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiBaseAbstract } from 'src/app/abstracts/kii-base.abstract';
import { Article } from 'src/app/_features/main/models/article';
import { KiiMainDataService } from 'src/app/_features/main/services/kii-main-data.service';
import { KiiMainArticleService } from 'src/app/_features/main/services/kii-main-article.service';
import { KiiTranslateService } from 'src/app/_features/translate/services/kii-translate.service';
import { Page } from 'src/app/_features/main/models/page';
import { KiiMainPageService } from 'src/app/_features/main/services/kii-main-page.service';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { KiiMainStatsService } from 'src/app/_features/main/services/kii-main-stats.service';
import { StatAction } from 'src/app/_features/main/models/stat';
import { KiiSocketService, IChatData, ChatDataType, IChatMessage, SocketEvents, IChatRoom } from './service/kii-socket.service';
import { KiiAuthUserService } from 'src/app/_features/auth/services/kii-auth-user.service';
import { KiiMainUserService } from 'src/app/_features/main/services/kii-main-user.service';
import { User } from 'src/app/_features/main/models/user';
import { environment } from 'src/environments/environment';
import { KiiFormAbstract } from 'src/app/abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';


@Component({
  selector: 'kii-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends KiiFormAbstract implements OnInit {

  
  /**Contains icons used in the chat */
  icons = {
    users: faUserFriends,
    send: faPaperPlane
  }

  /**Contains loggedIn user if any */
  loggedInUser :User = new User(null);

  /**Contains current chat messages */
  @Input() messages : IChatMessage[] = [];

  /**Contains current room info */
  @Input() room : IChatRoom = {
    id:null,
    participants:1,
    date: new Date(),
    messages: [],
    language: environment.languages[0]
  };

  /**If we are in the admin context we don't send FirstMessage */
  @Input() isAdminContext : boolean = false;


  /**When other chat partner is writting message */
  writting : boolean = false;

  /**Contains if is first message sent */
  isFirstMessage : boolean = true;

  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(
      private kiiApiStats: KiiMainStatsService,
      private socket: KiiSocketService, 
      private auth: KiiMainUserService,
      private trans: KiiTranslateService,

      private route: ActivatedRoute, 
      private data : KiiMainDataService,
      private articles: KiiMainArticleService,
      private router : Router
            ) { super()}

            ngOnInit() {
              this.trans.setRequiredContext(['chat']);
              this.kiiApiStats.send(StatAction.CHAT_ENTER,null);
              this.createForm();
              this.socket.getChatAdmins();  //Request chat admins
              this.socket.chatStart();      //Creates and gets room if we are not admin

              this.addSubscriber(
                this.auth.getLoggedInUser().subscribe(user => {
                  this.loggedInUser = user;
                })
              )
              //Gets all room-to-room data
              this.addSubscriber(
                this.socket.onDataChange().subscribe((data:IChatData) => {
                  if (data) {
                    switch (data.type) {
                      case ChatDataType.Message :
                        this.messages.push(data.object.message);
                        break;
                      case ChatDataType.StoredMessagesRequest:
                        //Give back our stored messages
                        this.socket.socket.emit(SocketEvents.CHAT_DATA, {room:this.room.id, type:ChatDataType.StoredMessagesResponse, object:{messages:this.messages,language:this.trans.get()}});
                        break;
                      case ChatDataType.Room :
                        this.room = data.object.room;  
                        break;
                      case ChatDataType.Participants :
                        this.room.participants = data.object.participants;
                        break;  
                      case ChatDataType.Writting :
                        this.writting = data.object.value; 
                        break;   
                      default:
                    }
                  }
                })
              )
          
            }
          
            /**Emit when we are writting in the form */
            ngAfterViewInit() {
              this.control.nativeElement.onfocus = () => (this.socket.sendChatData({room:this.room.id,type:ChatDataType.Writting,object:{value:true}}));
              this.control.nativeElement.onblur = () => (this.socket.sendChatData({room:this.room.id,type:ChatDataType.Writting,object:{value:false}}));
            }
          
            /**Creates the form */
            createForm() {
              this.myForm =  new FormGroup({    
                newMessage: new FormControl('', Validators.compose([])),
              });
            }
          
            /**Gets avatar or default avatar */
            getAvatar(avatar:string) {
              if (avatar) return avatar;
              else return './assets/kiilib/images/profile.svg';
            }
          
          
            /**Scrolls to bottom of element */
            scrollBottom() {
              try {
                this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
              } catch(err) { }  
            }
          
          
          
            /**When se submit the form we send the message */
            onSubmit() {
              if (this.myForm.controls["newMessage"].value!="") {
                let myMessage : IChatMessage = {
                  message: this.myForm.controls["newMessage"].value,
                  sender: this.socket.socket.id,
                  date: new Date(),
                  room:this.room.id,
                  isBot:false,
                  senderName: this.loggedInUser.firstName
                }
                if (this.isFirstMessage && !this.isAdminContext) {
                   this.socket.sendChatData({room:this.room.id, type: ChatDataType.FirstMessage, object: {message:myMessage}});
                   this.isFirstMessage = false;
                } else 
                   this.socket.sendChatData({room:this.room.id, type: ChatDataType.Message, object: {message:myMessage}});
                this.kiiApiStats.send(StatAction.CHAT_MESSAGE,null);
                this.messages.push(myMessage);
                //Reset form value
                this.myForm.controls["newMessage"].setValue("");
              }
            }
          
            /**Returns if message is bot */
            isBot(message:IChatMessage) {
                return message.isBot;
            }
          
            /**Returns if I am the sender of the message */
            iAmSender(message:IChatMessage) {
              if ((message.sender == this.socket.socket.id) && (message.isBot == false)) return true;
              return false;
            }
          
            getMessageOwner(message:IChatMessage) {
              if (message.isBot) return 'bot';
              if (message.sender == this.socket.socket.id) return 'you';
              if (message.senderName) return message.senderName;
              return null;
            }
          
            ngOnDestroy() {
              this.kiiApiStats.send(StatAction.CHAT_LEAVE,null);
              //Unsubscribe all
              for (let subscription of this._subscriptions) {
                subscription.unsubscribe();
              }
            }

}

