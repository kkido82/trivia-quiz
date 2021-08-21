import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { SharedModule } from '../shared/shared.module';
import {CarouselModule} from 'primeng/carousel';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    CarouselModule,
  ]
})
export class QuizModule { }
