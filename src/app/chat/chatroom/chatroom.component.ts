import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  splash = true;
  roomname ?: String;
  constructor() { }

  ngOnInit(): void {
    // console.log('room name from chatroom component ! ');
    this.roomname = localStorage.getItem("roomname")?.toString();
  }

}
