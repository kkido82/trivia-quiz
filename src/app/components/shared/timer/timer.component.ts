import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { scan, takeWhile, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TimerComponent {
  @Output() timeout = new EventEmitter();

  private readonly time!: number;
  timer$!: Observable<number> | null;

  constructor() {
    this.time = environment.question_time + 1;
  }

  start(): void {
    this.timer$ = timer(0, 1000).pipe(
      scan(time => --time, this.time),
      takeWhile(x => x >= 0),
      tap(time => time === 0 && this.timeout.emit())
    );
  }
}
