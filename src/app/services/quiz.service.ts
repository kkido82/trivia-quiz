import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { quizModels } from '../store/modules/quiz/models';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly endpoint = environment.trivia_api;
  questionIndex = 0;

  constructor(private http: HttpClient, private utils: UtilsService) { }

  load() {
    return this.http.get<quizModels.QuizResponse>(this.endpoint)
      .pipe(
        map(response => {
          if (response.response_code !== 0) {
            throw new Error('trivia api error occured');
          }

          return response.results.map(question => this.convert(question))
        })
      );
  }

  convert(question: quizModels.Question): quizModels.Question {
    const converted: quizModels.Question = {
      index: this.questionIndex++,
      category: this.encode(question.category),
      difficulty: this.encode(question.difficulty),
      type: this.encode(question.type),
      question: this.encode(question.question),
      answers: [{
        text: this.encode(question.correct_answer),
        isCorrect: true,
        selected: false
      },
      ...question.incorrect_answers.map(a => {
        const answer: quizModels.Answer = {
          text: this.encode(a),
          isCorrect: false,
          selected: false
        };

        return answer;
      })],
      correct_answer: '',
      incorrect_answers: [],
      completed: false,
    };

    converted.answers = this.utils.shuffle(converted.answers);

    return converted;
  }
 
  private encode = (decoded: string): string => atob(decoded);
}
