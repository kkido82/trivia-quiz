import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/message.model';
import { SelectedAnswer } from 'src/app/models/submit-answer.model';
import { AppState } from 'src/app/store/model';
import * as quiz from 'src/app/store/modules/quiz';
import { setCurrentQuestion } from 'src/app/store/modules/quiz/actions';
import { quizModels } from 'src/app/store/modules/quiz/models';
import { environment } from 'src/environments/environment';
import { MessageService } from '../shared/message/message.service';
import { TimerComponent } from '../shared/timer/timer.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements AfterViewInit {
  @ViewChild('timer') timer!: TimerComponent;

  quizLength = environment.quiz_length;
  questions$: Observable<quizModels.Question[]> = this.store.select(quiz.selectors.selectQuestions);
  currentQuestionIndex$: Observable<number> = this.store.select(quiz.selectors.selectCurrentQuestionIndex);
  nextBtn!: HTMLButtonElement;

  constructor(private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService) { }

  ngAfterViewInit(): void {
    (document.querySelector('.p-carousel-prev') as HTMLButtonElement).style.display = 'none';

    this.nextBtn = document.querySelector('.p-carousel-next') as HTMLButtonElement;
    this.nextBtn.style.visibility = 'hidden';

    this.timer.start();
  }

  load(): void {
    this.timer.start();
    this.store.dispatch(setCurrentQuestion());
  }

  submitted(answer?: SelectedAnswer): void {
    this.setMessage(answer?.message || { text: '', type: 'success' });

    setTimeout(() => this.messageService.clear(), 1500);

    if (answer?.questionIndex === environment.quiz_length - 1) {
      this.router.navigate(['/summary']);
      return;
    }

    if(answer?.submit) {
      this.nextBtn.click();
    }
  }

  onTimeOut(): void {
    let questionIndex = -1;
    this.currentQuestionIndex$.subscribe(index => questionIndex = index);

    this.submitted({
      isCorrect: false,
      submit: true,
      questionIndex,
      message: { text: 'Time is up - 0 points', type: 'error' }
    });
  }

  async setMessage(message: MessageModel): Promise<void> {
    this.messageService.setMessage(message);
    setTimeout(() => this.messageService.clear(), 1000);
  }
}
