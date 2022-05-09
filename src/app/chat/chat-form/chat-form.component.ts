import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/chat-service.service';
@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string='';
  roomname ?: String;

  constructor(private chat: ChatService,private router: Router) {
    this.roomname = localStorage.getItem("roomname")?.toString();   }

  ngOnInit(): void {
  }
  send(){
    this.chat.sendMessage(this.message);
    console.log(this.message);
    this.message = '';

  }
  handleSubmit(event: { keyCode: number }) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  exitRoom(){
    this.router.navigate(['/chat'],{replaceUrl:true});
    localStorage.setItem("roomname","");
  }


  }

