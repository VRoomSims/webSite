import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ChatService } from '../../chat-service.service';
import {AngularFireList } from '@angular/fire/compat/database';
import { ChatMessage } from 'src/app/models/chat-message.model';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnChanges {
  feed: any;
  feeds!: Observable<any[]>;
  dataMessage = [];

  constructor(private chat: ChatService, private db: AngularFireDatabase) {
    this.feeds = db.list('/messages').valueChanges();
    this.feeds.subscribe((feeds) => {
      this.feed = feeds;

      setTimeout(() => {
        this.scrollToTheLastElementByclassNmae();
      }, 30);

    });
  }

  ngOnInit() {
    this.feeds = this.db.list('/messages').valueChanges();
    this.feeds.subscribe((feeds) => {
      this.feed = feeds;
      console.log("==========================================");
      // let yy = this.chat.getMessages().snapshotChanges();
      // console.log(yy);
      // console.log(feeds);

      let roomname = localStorage.getItem("roomname")?.toString();

      let current_data_message = <ChatMessage[]>this.feed;
      console.log(current_data_message);

      this.feed= (current_data_message).filter((fed :ChatMessage) => {
          //  console.log("blabla",fed.roomname);
           return fed.roomname == roomname;
         });



      // let current_data_message = <ChatMessage[]>this.feed;

      // console.log(this.feed)
      console.log("==========================================");

      // let x = JSON.stringify(this.feed);
      //   console.log(x);

      // let att = Object.keys(x);
      // console.log("attributes ! ")
      // console.log(att);

      // let displayedData : any = [];

      // console.log(roomname);
      // console.log("All Messages ! ");
      // console.log(this.feed);

      // console.log(this.feed)

      // current_data_message.filter(chat => chat['message'] === "aa");
      // for(let i = 0;i<current_data_message.length;i++){
      //   console.log((current_data_message[i])['roomname']);
      //   if((current_data_message[i])['roomname']?.toString() == roomname){
      //     console.log("one chat found ! ")
      //     displayedData[displayedData.length] = current_data_message[i];
      //   }
      // }

      // console.log('filtred messages ! ');
      // console.log(current_data_message);


      // console.log(current_data_message);
    });
    // this.feed= this.chat.getMessages();
  }

  ngOnChanges() {
    this.feeds = this.db.list('/messages').valueChanges();
    this.feeds.subscribe((feeds) => {
      this.feed = feeds;

    });


    // this.feed= this.chat.getMessages();

  }
  scrollToTheLastElementByclassNmae() {
    let elements = document.getElementsByClassName('feed');
    let ultimo: any = elements[(elements.length-1)];
    let toppos = ultimo.offsetTop;
    //@ts-ignore
    document.getElementById('feeed')?.scrollTop = toppos;
  }
}
