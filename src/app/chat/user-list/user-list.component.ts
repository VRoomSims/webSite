import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';
import { map } from 'rxjs/operators';
import { Room } from 'src/app/models/room/room.model';
import { RoomService } from 'src/app/services/roomService/room.service';
import { Router } from '@angular/router';
import { type } from 'os';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {

  roomData : Room[] = new Array();

  constructor(private dialogref : MatDialog,private roomService: RoomService,private router: Router){
    this.retrieveRoomList();

  }



  ngOnInit(){
    this.retrieveRoomList();

  }

  openPopUp(){
    this.dialogref.open(AddRoomComponent);
    console.log(this.roomData);

  }

  roomCodeRequired(){
    this.dialogref.open(ModalComponent);

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

  enterRoom(roomname ?: String){
    let currentRoom  = new Room();
    for(let i =0;i<this.roomData?.length;i++){
      if(this.roomData[i].title == roomname){
        currentRoom = this.roomData[i];
        break;
      }
    }
    if(currentRoom.status == "public"){
      this.router.navigate(['/chat/', roomname],{replaceUrl:true});

    }
    else{
      // let password = prompt("Enter The room code ! ")
      // if(password == currentRoom.roomCode){
      //   this.router.navigate(['/chat/', roomname],{replaceUrl:true});
      // }
      // else{
      //   alert("Wrong Password ! ");
      // }
      // console.log("you should enter the password of the room ! ");
      this.roomCodeRequired();

    }
    if(roomname !== undefined){
      localStorage.setItem("roomname",roomname.toString());
    }
  }
}
