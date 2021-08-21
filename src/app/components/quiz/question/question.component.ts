import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/model';
import { quizModels } from 'src/app/store/modules/quiz/models';
import { loadQuestions, submitAnswer } from 'src/app/store/modules/quiz/actions';
import { SelectedAnswer } from 'src/app/models/submit-answer.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements AfterViewInit {
  @Input() loadNew!: boolean | null;
  @Input() question!: quizModels.Question;
  @Output() submitted = new EventEmitter<SelectedAnswer>();

  showMessage = new BehaviorSubject(false);

  wrong = false;
  tries = 3;

  constructor(private store: Store<AppState>) { }

  ngAfterViewInit(): void {
    if (this.loadNew) {
      this.store.dispatch(loadQuestions());
    }
  }

  selectAnswer(selectedAnswer: SelectedAnswer) {
    this.tries -= 1;

    if (selectedAnswer.isCorrect) {
      selectedAnswer.message = { text: 'Correct', type: 'success' };
    } else {
      selectedAnswer.message = {
        text: this.tries === 0 ? 'out of tries - 0 points' : `Wrong Answer - ${this.tries} tries left`,
        type: 'error'
      };
    }

    selectedAnswer.submit = selectedAnswer.isCorrect || this.tries <= 0 || selectedAnswer.submit;
    selectedAnswer.questionIndex = this.question.index === undefined ? -1 : this.question.index;

    this.store.dispatch(submitAnswer(selectedAnswer));

    
    this.submitted.emit(selectedAnswer);
  }
}
