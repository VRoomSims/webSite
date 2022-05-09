import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../../models/chat-message.model';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() chatMessage!: ChatMessage;
  userEmail!: string | undefined;
  userName!: string | undefined;
  // userName!: Observable<string> | undefined;
  messageContent: string | undefined;
  timeStamp: string | undefined;
   isOwnMessage!: boolean;
  // ownEmail!: string | null | undefined;

  constructor(private authService: AuthService) {
    // authService.authUser().subscribe((user) => {
    //   this.ownEmail = user?.email;
    //   this.isOwnMessage = this.ownEmail === this.userEmail;
    // });
    // this.messageContent = this.chatMessage.message;
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userEmail = this.chatMessage.email;

    this.userName = this.chatMessage.userName;
   
  }
  
}
