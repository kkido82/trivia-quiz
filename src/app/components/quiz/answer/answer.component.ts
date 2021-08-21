import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedAnswer } from 'src/app/models/submit-answer.model';
import { quizModels } from 'src/app/store/modules/quiz/models';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnswerComponent {
  @Input() answer!: quizModels.Answer;
  @Output() selected = new EventEmitter<SelectedAnswer>();

  constructor() { }

  selectAnswer(answer: quizModels.Answer): void {
    const selected: SelectedAnswer = {
      questionIndex: -1,
      isCorrect: answer.isCorrect,
      submit: false,
      message: { text: '', type: 'error' }
    }

    this.selected.emit(selected);
  }
}
