import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LOAD_QUESTIONS, QUESTIONS_LOADED, QUESTIONS_LOAD_FAILED } from "./actions";
import { QuizService } from "src/app/services/quiz.service";

@Injectable()
export class QuizEffects {
    getQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_QUESTIONS),
        mergeMap(() => this.quizService.load()
            .pipe(
                map(questions => ({ type: QUESTIONS_LOADED, questions })),
                catchError(() => of({ type: QUESTIONS_LOAD_FAILED }))
            ))
    ));

    constructor(
        private actions$: Actions,
        private quizService: QuizService
    ) { }
}
