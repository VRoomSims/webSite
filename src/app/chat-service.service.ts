import { Injectable } from '@angular/core';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ChatMessage } from './models/chat-message.model';
import { AuthService } from './shared/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: any;
  chatMessages!: AngularFireList<ChatMessage[]>;
  chatMessage!: ChatMessage[];
  userName!: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        console.log(this.user);
      }
    });
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();
    const chatMessagePushed = {
      message: msg,
      timeSent: timestamp,
      //userName: this.authService.authUser,
      userName: "Mohamed",
      email: localStorage.getItem('email'),
      roomname : localStorage.getItem("roomname")
    };
    this.db.list('/messages').push(chatMessagePushed);
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    let roomname = localStorage.getItem('roomname')
    return this.db.list('/messages', (ref) => {
      return ref.limitToLast(25).orderByKey();
    });
  }
  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      '/' +
      (now.getUTCMonth() + 1) +
      '/' +
      now.getUTCDate();
    const time =
      now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
