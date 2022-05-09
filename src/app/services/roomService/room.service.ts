import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Room } from 'src/app/models/room/room.model';


@Injectable({
  providedIn: 'root'
})
export class RoomService {


  private dbPath = '/rooms';

  roomRef: AngularFireList<Room>;


  constructor(private db: AngularFireDatabase) {
    this.roomRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Room> {
    return this.roomRef;
  }

  create(room: Room): any {
    return this.roomRef.push(room);
  }


}
