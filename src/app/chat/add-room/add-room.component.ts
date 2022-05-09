import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Room } from 'src/app/models/room/room.model';
import { RoomService } from 'src/app/services/roomService/room.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  // roomType: string[] = ['public', 'private'];

  isHide = true ;
  myRadio: String = "";
  submitted = true ;
  room : Room = new Room();
  roomData: Room[] = [];
  chat : ChatMessage = new ChatMessage();



  form = new FormGroup({
    gender: new FormControl('', Validators.required),
    roomCode: new FormControl('', Validators.required)
  });

  roomForm = new FormGroup({
    title: new FormControl('', [Validators.required]),

  });
  // form = new FormGroup({
  //   selectedOption: new FormControl(),
  //   roomCode : new FormControl(RequiredValidator)

  // });


  constructor(private roomService: RoomService,private dialogref : MatDialog,private toast: NgToastService) {
    console.log("ng init ");
    console.log(this.form.value['gender']);
  }

  ngOnInit(): void {
    this.retrieveRoomList();


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

  createNewRoom(): void {
    this.newRoom();

    const { title } = this.roomForm.value;
    const {gender,roomCode} = this.form.value ;
    if(gender == "public"){
      this.room.status = "public"
      this.room.roomCode = "";
    }
    else{
      this.room.status = "private"

      this.room.roomCode = roomCode ;
    }


    if(!this.checkRoomExist(title)){
      console.log("Room Name alerady exist ! ");
      // this.toast.warning({detail: 'Room Alerady Exist ',summary : 'Warning',duration : 2000,position : 'tr'});
    }
    else{
      // this.toast.warning({detail: 'Room added successfully',summary : 'Success',duration : 2000,position : 'tr'});
      this.room.title =  title ;

      this.roomService.create(this.room).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
      this.dialogref.closeAll();

    });
  }
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }


  checkRoomExist(title : String) : any{
    if(this.roomData.length > 0){
      for(let i = 0 ; i<this.roomData.length; i++){
        if(this.roomData[i].title === title){
          return false;
        }
     }
    return true ;

  }
}



}
