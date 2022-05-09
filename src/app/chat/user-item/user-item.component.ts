import { Component, OnInit , Input} from '@angular/core';
import { RoomService } from 'src/app/services/roomService/room.service';
import { Room } from 'src/app/models/room/room.model';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() room ?: Room;
  title :String =  "";

  constructor() { }

  ngOnInit(): void {
  }

}
