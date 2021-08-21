import { createReducer, on } from "@ngrx/store";
import { questionsLoaded, setCurrentQuestion, submitAnswer } from "./actions";
import { initialState } from "./models";
import * as models from "./models";
import * as selectors from "./selectors";

export const quizReducer = createReducer(
    initialState,
    on(questionsLoaded, (state, action) => ({
        ...state,
        questions: [...state.questions, ...action.questions],
    })),
    on(setCurrentQuestion, state => ({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
    })),
    on(submitAnswer, (state, action) => {
        if(action.isCorrect) {
            return {
                ...state,
                score: state.score + 1
            }
        }

        return {
            ...state
        }
    })
);

export { models, selectors }