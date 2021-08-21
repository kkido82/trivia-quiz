import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadQuestions } from './store/modules/quiz/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'trivia-quiz';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
  }
}
