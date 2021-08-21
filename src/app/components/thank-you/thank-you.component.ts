import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/model';
import * as quiz from "src/app/store/modules/quiz";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThankYouComponent implements OnInit {
  score$!: Observable<number>;
  total!: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.score$ = this.store.select(quiz.selectors.selectScore);
    this.total = environment.quiz_length;
  }
}
