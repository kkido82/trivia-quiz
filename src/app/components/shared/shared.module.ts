import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    TimerComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TimerComponent,
    MessageComponent
  ]
})
export class SharedModule { }
