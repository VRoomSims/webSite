import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  roomname ?: String ;
  constructor() { }

  ngOnInit(): void {
    this.roomname = localStorage.getItem("roomname")?.toString();

    console.log("you have entered the room named : ")
    console.log(this.roomname);
  }

}
