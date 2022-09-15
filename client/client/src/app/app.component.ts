import { Component, ViewChild } from '@angular/core';
import { concatWith } from 'rxjs';
import { ServService } from './serv.service';


@Component({
  selector: 'chat',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'Chat';
  newMessage: string = '';
  messageList: string[] = [];

  constructor(private ServService: ServService){

  }

  ngOnInit(){
    this.ServService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
      const div = document.querySelector('#messages');
      if (div)
        div.scrollTo(0, div.scrollHeight);
    })
  }

  sendMessage() {
    this.ServService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}