import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Room } from '../models/room/room.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/roomService/room.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  roomData : Room[] = new Array();
  wrong_pass = false

  roomPass = new FormGroup({
    code: new FormControl('', [Validators.required])
  });
  constructor(private dialogref : MatDialog,private roomService: RoomService,private router : Router) {
    this.retrieveRoomList();
  }

  ngOnInit(): void {
  }

  get code() {
    return this.roomPass.get('code');
  }

  retrieveRoomList(): void {
    this.roomService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.roomData = data;
    });
  }

  isThePassIsCorrect(){
    let roomname = localStorage.getItem("roomname");
    let currentRoom  = new Room();
    for(let i =0;i<this.roomData?.length;i++){
      if(this.roomData[i].title == roomname){
        currentRoom = this.roomData[i];
        break;
      }
    }

    const { code } = this.roomPass.value;

    if(code == currentRoom.roomCode){
      this.dialogref.closeAll();
        this.router.navigate(['/chat/', roomname],{replaceUrl:true});
    }
    else if(code.length >0 ){
      this.dialogref.closeAll();

      alert("wrong password ! ");
    }


  }

}
