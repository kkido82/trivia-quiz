import { AppState } from "./model";
import * as quiz from "./modules/quiz";

const initialState: AppState = {
    // app: app.initialState,
    quiz: quiz.models.initialState
};

const reducers = {
    quiz: quiz.quizReducer
}

export { initialState, reducers }
