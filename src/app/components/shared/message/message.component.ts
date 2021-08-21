import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private subscription!: Subscription;
  message = {
    text: '',
    cssClass: '',
  };
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        if(!message) {
          return;
        }

        this.message.cssClass = message.type;
        this.message.text = message.text;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
